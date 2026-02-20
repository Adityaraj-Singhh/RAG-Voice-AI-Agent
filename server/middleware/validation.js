/**
 * Validation Middleware
 * Express-validator rules for lead form data
 */

const { body, validationResult } = require('express-validator');

/**
 * Validation rules for lead submission
 */
const leadValidationRules = [
  // Name validation
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces')
    .escape(),

  // Phone number validation
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .customSanitizer(value => {
      // Remove all non-digit characters
      return value.replace(/\D/g, '');
    })
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid Indian mobile number (starting with 6-9)'),

  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),

  // Stream validation
  body('stream')
    .trim()
    .notEmpty()
    .withMessage('Stream is required')
    .isIn(['Science', 'Commerce', 'Humanities'])
    .withMessage('Stream must be Science, Commerce, or Humanities')
];

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg
    }));
    
    console.log('❌ Validation errors:', errorMessages);
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  
  next();
};

module.exports = {
  leadValidationRules,
  validate
};
