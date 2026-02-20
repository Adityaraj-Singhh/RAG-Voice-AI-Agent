/**
 * Phone Validator Utility
 * Utilities for validating and formatting Indian phone numbers
 */

/**
 * Clean phone number by removing all non-digit characters
 * @param {string} phoneNumber - Raw phone number input
 * @returns {string} Cleaned phone number with only digits
 */
const cleanPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  return String(phoneNumber).replace(/\D/g, '');
};

/**
 * Standardize phone number to 10 digits
 * Handles various input formats including country code
 * @param {string} phoneNumber - Raw phone number input
 * @returns {string} Standardized 10-digit number or 'incorrect format'
 */
const standardizePhoneNumber = (phoneNumber) => {
  let cleanNumber = cleanPhoneNumber(phoneNumber);
  
  // Handle different cases
  if (cleanNumber.length === 10) {
    // Perfect - just 10 digits
    return cleanNumber;
  } else if (cleanNumber.length === 12 && cleanNumber.startsWith('91')) {
    // Indian number with country code +91
    return cleanNumber.slice(2);
  } else if (cleanNumber.length === 11 && cleanNumber.startsWith('0')) {
    // Number with leading 0
    return cleanNumber.slice(1);
  } else {
    // Wrong format
    return 'incorrect format';
  }
};

/**
 * Validate Indian mobile number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {Object} Validation result with isValid and message
 */
const validateIndianMobile = (phoneNumber) => {
  const cleanNumber = cleanPhoneNumber(phoneNumber);
  
  // Check length
  if (cleanNumber.length !== 10) {
    return {
      isValid: false,
      message: 'Phone number must be exactly 10 digits',
      cleanNumber
    };
  }
  
  // Check if starts with valid Indian mobile prefix (6-9)
  if (!/^[6-9]/.test(cleanNumber)) {
    return {
      isValid: false,
      message: 'Indian mobile numbers must start with 6, 7, 8, or 9',
      cleanNumber
    };
  }
  
  // Check all digits
  if (!/^\d{10}$/.test(cleanNumber)) {
    return {
      isValid: false,
      message: 'Phone number must contain only digits',
      cleanNumber
    };
  }
  
  return {
    isValid: true,
    message: 'Valid Indian mobile number',
    cleanNumber
  };
};

/**
 * Format phone number for display
 * @param {string} phoneNumber - 10-digit phone number
 * @returns {string} Formatted phone number (XXX-XXX-XXXX)
 */
const formatPhoneForDisplay = (phoneNumber) => {
  const cleanNumber = cleanPhoneNumber(phoneNumber);
  
  if (cleanNumber.length !== 10) {
    return phoneNumber;
  }
  
  return `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
};

/**
 * Format phone number with country code for international calls
 * @param {string} phoneNumber - 10-digit phone number
 * @returns {string} Phone number with +91 prefix
 */
const formatPhoneWithCountryCode = (phoneNumber) => {
  const cleanNumber = cleanPhoneNumber(phoneNumber);
  
  if (cleanNumber.length === 10) {
    return `+91${cleanNumber}`;
  }
  
  return phoneNumber;
};

module.exports = {
  cleanPhoneNumber,
  standardizePhoneNumber,
  validateIndianMobile,
  formatPhoneForDisplay,
  formatPhoneWithCountryCode
};
