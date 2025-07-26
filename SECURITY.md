# Security Documentation

## Overview

This document outlines the security measures implemented in the Interview Copilot API to protect against common vulnerabilities and attacks.

## Security Features Implemented

### 1. Environment Variable Validation
- **Purpose**: Ensures all required environment variables are present before the application starts
- **Implementation**: `validateEnvironmentVariables()` function checks for required variables
- **Required Variables**:
  - `GEMINI_AI_KEY`: Google Gemini API key
  - `GEMINI_MODEL`: Gemini model name (e.g., 'gemini-pro')
  - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS

### 2. Rate Limiting
- **Purpose**: Prevents abuse and DoS attacks by limiting request frequency
- **Implementation**: In-memory rate limiting (use Redis in production)
- **Configuration**:
  - Window: 1 minute
  - Max requests: 10 per minute per IP
  - Returns 429 status code when exceeded

### 3. Input Validation & Sanitization
- **Purpose**: Prevents malicious input and injection attacks
- **Features**:
  - Type checking for string inputs
  - Maximum request size limit (10KB)
  - Content filtering for malicious patterns
  - XSS prevention through script tag detection

### 4. CORS (Cross-Origin Resource Sharing)
- **Purpose**: Controls which domains can access the API
- **Implementation**: Configurable allowed origins
- **Headers**: Proper CORS headers for preflight requests

### 5. Request Size Limits
- **Purpose**: Prevents large payload attacks
- **Limit**: 10KB maximum request size
- **Enforcement**: Validated before processing

### 6. Request Timeout
- **Purpose**: Prevents hanging requests and resource exhaustion
- **Timeout**: 30 seconds maximum
- **Implementation**: AbortController with cleanup

### 7. Error Handling
- **Purpose**: Prevents information leakage through error messages
- **Implementation**: Generic error responses, detailed logging internally
- **Security**: No sensitive information exposed to clients

### 8. Content Type Validation
- **Purpose**: Ensures only expected content types are processed
- **Allowed**: `text/plain` and `application/json`
- **Rejection**: Returns 400 for invalid content types

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Required
GEMINI_AI_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-pro

# Security
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Security Configuration

The security settings are centralized in `app/utils/security-config.ts`:

```typescript
export const SECURITY_CONFIG = {
    RATE_LIMIT_WINDOW: 60 * 1000,        // 1 minute
    RATE_LIMIT_MAX_REQUESTS: 10,         // 10 requests per minute
    MAX_REQUEST_SIZE: 10000,             // 10KB
    REQUEST_TIMEOUT: 30000,              // 30 seconds
    ALLOWED_ORIGINS: [...],              // CORS origins
    BLOCKED_PATTERNS: [...],             // Content filtering
    GEMINI_CONFIG: {...}                 // AI model config
}
```

## Production Recommendations

### 1. Use Redis for Rate Limiting
Replace the in-memory rate limiting with Redis for distributed deployments:

```typescript
// Example Redis implementation
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);
```

### 2. Add Authentication
Implement proper authentication (JWT, API keys, OAuth):

```typescript
// Example middleware
function authenticateRequest(request: NextRequest) {
    const token = request.headers.get('authorization');
    if (!token) {
        throw new Error('Authentication required');
    }
    // Validate token...
}
```

### 3. Use HTTPS
Ensure all production traffic uses HTTPS with proper SSL certificates.

### 4. Add Request Logging
Implement comprehensive logging for security monitoring:

```typescript
// Example logging
console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${clientId}`);
```

### 5. Implement API Key Rotation
Regularly rotate your Gemini API keys and other sensitive credentials.

### 6. Add Monitoring
Set up alerts for:
- Rate limit violations
- Large request volumes
- Error rate spikes
- Unusual request patterns

## Security Headers

The API automatically includes security headers:

- `Access-Control-Allow-Origin`: Controlled CORS
- `Access-Control-Allow-Methods`: Limited to POST, OPTIONS
- `Access-Control-Allow-Headers`: Content-Type, Authorization
- `Retry-After`: Rate limit information

## Testing Security

### Rate Limiting Test
```bash
# Test rate limiting
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/interview \
    -H "Content-Type: application/json" \
    -d '{"prompt":"test"}'
done
```

### Input Validation Test
```bash
# Test malicious input
curl -X POST http://localhost:3000/api/interview \
  -H "Content-Type: application/json" \
  -d '{"prompt":"<script>alert(\"xss\")</script>"}'
```

### CORS Test
```bash
# Test CORS from unauthorized origin
curl -X POST http://localhost:3000/api/interview \
  -H "Origin: http://malicious-site.com" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

## Incident Response

If you suspect a security breach:

1. **Immediate Actions**:
   - Rotate API keys
   - Check logs for suspicious activity
   - Review rate limiting data

2. **Investigation**:
   - Analyze request patterns
   - Check for data exfiltration
   - Review error logs

3. **Recovery**:
   - Update security configurations
   - Implement additional monitoring
   - Document lessons learned

## Compliance

This implementation addresses common security requirements:

- **OWASP Top 10**: Protection against injection, XSS, rate limiting
- **CORS**: Proper cross-origin request handling
- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Secure error responses

## Updates

Keep this security documentation updated as you add new features or security measures to the application. 