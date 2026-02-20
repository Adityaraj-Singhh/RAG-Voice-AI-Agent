/**
 * Middleware Index
 * Export all middleware modules
 */

const { leadValidationRules, validate } = require('./validation');
const { generalLimiter, leadSubmissionLimiter, strictLimiter } = require('./rateLimiter');
const { ApiError, notFoundHandler, errorHandler, asyncHandler } = require('./errorHandler');

module.exports = {
  // Validation
  leadValidationRules,
  validate,
  
  // Rate Limiting
  generalLimiter,
  leadSubmissionLimiter,
  strictLimiter,
  
  // Error Handling
  ApiError,
  notFoundHandler,
  errorHandler,
  asyncHandler
};
