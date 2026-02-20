/**
 * Error Handler Middleware
 * Centralized error handling for the application
 */

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * MongoDB Duplicate Key Error Handler
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  
  if (field === 'phoneNumber') {
    return new ApiError(409, 'This phone number is already registered. We will contact you soon!');
  }
  
  return new ApiError(409, `A record with this ${field} already exists: ${value}`);
};

/**
 * MongoDB Validation Error Handler
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(error => ({
    field: error.path,
    message: error.message
  }));
  
  return new ApiError(400, 'Validation failed', errors);
};

/**
 * MongoDB Cast Error Handler (Invalid ObjectId)
 */
const handleCastError = (err) => {
  return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
};

/**
 * JWT Error Handler
 */
const handleJWTError = () => {
  return new ApiError(401, 'Invalid token. Please log in again.');
};

/**
 * JWT Expired Error Handler
 */
const handleJWTExpiredError = () => {
  return new ApiError(401, 'Your token has expired. Please log in again.');
};

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Log error for debugging
  console.error('❌ Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }
  
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }
  
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }
  
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }
  
  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Default error response
  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      originalError: err.message
    })
  });
};

/**
 * Async Handler Wrapper
 * Catches errors from async functions and passes to error handler
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  ApiError,
  notFoundHandler,
  errorHandler,
  asyncHandler
};
