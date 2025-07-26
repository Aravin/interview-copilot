import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { SECURITY_CONFIG, validateEnvironmentVariables } from "../../utils/security-config";

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Initialize Gemini AI
function initializeGemini() {
    validateEnvironmentVariables();
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_AI_KEY! });
    return ai;
}

// Rate limiting middleware
function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const userData = rateLimitStore.get(identifier);
    
    if (!userData || now > userData.resetTime) {
        rateLimitStore.set(identifier, { count: 1, resetTime: now + SECURITY_CONFIG.RATE_LIMIT_WINDOW });
        return true;
    }
    
    if (userData.count >= SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }
    
    userData.count++;
    return true;
}

// Input validation
function validateInput(prompt: string): { isValid: boolean; error?: string } {
    if (!prompt || typeof prompt !== 'string') {
        return { isValid: false, error: 'Prompt must be a non-empty string' };
    }
    
    if (prompt.length > SECURITY_CONFIG.MAX_REQUEST_SIZE) {
        return { isValid: false, error: `Prompt too long. Maximum ${SECURITY_CONFIG.MAX_REQUEST_SIZE} characters allowed` };
    }
    
    // Content filtering using security config patterns
    for (const pattern of SECURITY_CONFIG.BLOCKED_PATTERNS) {
        if (pattern.test(prompt)) {
            return { isValid: false, error: 'Invalid content detected' };
        }
    }
    
    return { isValid: true };
}

// CORS headers
function getCorsHeaders(origin: string) {
    const isAllowedOrigin = SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin) || SECURITY_CONFIG.ALLOWED_ORIGINS.includes('*');
    
    return {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : SECURITY_CONFIG.ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
    };
}

// Initialize model
const model = initializeGemini();

export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin') || '';
    
    return new NextResponse(null, {
        status: 200,
        headers: getCorsHeaders(origin),
    });
}

export async function POST(request: NextRequest) {
    try {
        // CORS handling
        const origin = request.headers.get('origin') || '';
        const corsHeaders = getCorsHeaders(origin);
        
        // Get client identifier (IP or user ID)
        const clientId = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
        
        // Rate limiting
        if (!checkRateLimit(clientId)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { 
                    status: 429,
                    headers: {
                        ...corsHeaders,
                        'Retry-After': '60',
                    }
                }
            );
        }
        
        // Check content type
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('text/plain') && !contentType?.includes('application/json')) {
            return NextResponse.json(
                { error: 'Invalid content type. Use text/plain or application/json' },
                { status: 400, headers: corsHeaders }
            );
        }
        
        // Parse request body
        let prompt: string;
        try {
            if (contentType?.includes('application/json')) {
                const body = await request.json();
                prompt = body.prompt || body.text || '';
            } else {
                prompt = await request.text();
            }
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid request body' },
                { status: 400, headers: corsHeaders }
            );
        }
        
        // Validate input
        const validation = validateInput(prompt);
        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400, headers: corsHeaders }
            );
        }
        
        // Generate content with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SECURITY_CONFIG.REQUEST_TIMEOUT);
        
        try {
            const result = await model.models.generateContent({
                model: process.env.GEMINI_MODEL!,
                contents: prompt,
                config: {
                    temperature: SECURITY_CONFIG.GEMINI_CONFIG.temperature,
                    maxOutputTokens: SECURITY_CONFIG.GEMINI_CONFIG.maxOutputTokens
                }
            });
            clearTimeout(timeoutId);
            
            const responseText = result.text;
            const usageMetadata = result.usageMetadata;
            
            return NextResponse.json(
                { 
                    response: responseText,
                    usage: {
                        promptTokens: usageMetadata?.promptTokenCount,
                        responseTokens: usageMetadata?.candidatesTokenCount,
                        totalTokens: usageMetadata?.totalTokenCount,
                    }
                },
                { 
                    status: 200,
                    headers: corsHeaders
                }
            );
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error && error.name === 'AbortError') {
                return NextResponse.json(
                    { error: 'Request timeout' },
                    { status: 408, headers: corsHeaders }
                );
            }
            
            throw error; // Re-throw to be caught by outer try-catch
        }
        
    } catch (error) {
        console.error('API Error:', error);
        
        // Don't expose internal errors to client
        return NextResponse.json(
            { error: 'Internal server error' },
            { 
                status: 500,
                headers: getCorsHeaders(request.headers.get('origin') || '')
            }
        );
    }
}
