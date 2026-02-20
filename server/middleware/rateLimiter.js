/**
 * Rate Limiter Middleware
 * Prevents abuse by limiting requests per IP
 */

const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * Allows 100 requests per 15 minutes
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    console.log(`⚠️ Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json(options.message);
  }
});

/**
 * Lead submission rate limiter
 * Allows 5 form submissions per IP per hour
 */
const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 5 submissions per hour
  message: {
    success: false,
    message: 'Too many form submissions from this IP. Please try again after an hour.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use X-Forwarded-For header if behind proxy, otherwise use IP
    return req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  },
  handler: (req, res, next, options) => {
    console.log(`⚠️ Lead submission rate limit exceeded for IP: ${req.ip}`);
    console.log(`📋 Attempted submission data: ${JSON.stringify(req.body)}`);
    res.status(429).json(options.message);
  },
  skip: (req) => {
    // Skip rate limiting in test environment
    return process.env.NODE_ENV === 'test';
  }
});

/**
 * Strict rate limiter for sensitive operations
 * Allows 10 requests per 10 minutes
 */
const strictLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: '10 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  leadSubmissionLimiter,
  strictLimiter
};
