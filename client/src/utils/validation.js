/**
 * Validation Utilities
 * Form validation functions for the lead form
 */

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {string|boolean} Error message or true if valid
 */
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters';
  }
  
  if (trimmedName.length > 50) {
    return 'Name cannot exceed 50 characters';
  }
  
  // Only allow letters and spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(trimmedName)) {
    return 'Name can only contain letters and spaces';
  }
  
  return true;
};

/**
 * Validate email field
 * @param {string} email - Email to validate
 * @returns {string|boolean} Error message or true if valid
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return 'Please enter a valid email address';
  }
  
  if (trimmedEmail.length > 100) {
    return 'Email cannot exceed 100 characters';
  }
  
  return true;
};

/**
 * Validate phone number field
 * @param {string} phone - Phone number to validate
 * @returns {string|boolean} Error message or true if valid
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return 'Phone number is required';
  }
  
  // Clean phone number
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 0) {
    return 'Phone number is required';
  }
  
  if (cleanPhone.length !== 10) {
    return 'Phone number must be exactly 10 digits';
  }
  
  // Indian mobile numbers start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(cleanPhone)) {
    return 'Please enter a valid Indian mobile number (starting with 6-9)';
  }
  
  return true;
};

/**
 * Validate stream field
 * @param {string} stream - Stream to validate
 * @returns {string|boolean} Error message or true if valid
 */
export const validateStream = (stream) => {
  const validStreams = ['Science', 'Commerce', 'Humanities'];
  
  if (!stream) {
    return 'Please select a stream';
  }
  
  if (!validStreams.includes(stream)) {
    return 'Please select a valid stream';
  }
  
  return true;
};

/**
 * Validate entire form
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateForm = (formData) => {
  const errors = {};
  
  const nameResult = validateName(formData.name);
  if (nameResult !== true) {
    errors.name = nameResult;
  }
  
  const phoneResult = validatePhone(formData.phoneNumber);
  if (phoneResult !== true) {
    errors.phoneNumber = phoneResult;
  }
  
  const emailResult = validateEmail(formData.email);
  if (emailResult !== true) {
    errors.email = emailResult;
  }
  
  const streamResult = validateStream(formData.stream);
  if (streamResult !== true) {
    errors.stream = streamResult;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validators = {
  validateName,
  validateEmail,
  validatePhone,
  validateStream,
  validateForm
};

export default validators;
