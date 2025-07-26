/**
 * Security Configuration for Interview Copilot API
 * 
 * Environment Variables Required:
 * - GEMINI_AI_KEY: Your Google Gemini API key
 * - GEMINI_MODEL: The Gemini model to use (e.g., 'gemini-2.0-flash-001')
 * - ALLOWED_ORIGINS: Comma-separated list of allowed origins for CORS
 * 
 * Recommended Models (using @google/genai SDK):
 * - gemini-2.0-flash-001: Fast, cost-effective, great for structured tasks
 * - gemini-2.0-flash: Alternative to flash-001
 * - gemini-1.5-flash: Good balance of speed and quality
 * 
 * Example .env file:
 * GEMINI_AI_KEY=your_gemini_api_key_here
 * GEMINI_MODEL=gemini-2.0-flash-001
 * ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
 */

export const SECURITY_CONFIG = {
    // Rate limiting
    RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
    RATE_LIMIT_MAX_REQUESTS: 10, // 10 requests per minute
    
    // Request limits
    MAX_REQUEST_SIZE: 10000, // 10KB max request size
    REQUEST_TIMEOUT: 30000, // 30 second timeout
    
    // CORS
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    
    // Content filtering patterns
    BLOCKED_PATTERNS: [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /eval\s*\(/gi,
        /document\./gi,
        /window\./gi,
    ],
    
    // Gemini configuration
    GEMINI_CONFIG: {
        temperature: 0.5,
        maxOutputTokens: 2048,
    }
} as const;

export function validateEnvironmentVariables(): void {
    const required = ['GEMINI_AI_KEY', 'GEMINI_MODEL'];
    const missing = required.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
} 