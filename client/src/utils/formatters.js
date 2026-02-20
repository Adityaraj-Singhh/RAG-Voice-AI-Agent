/**
 * Formatter Utilities
 * Formatting functions for display and data processing
 */

/**
 * Clean phone number by removing all non-digit characters
 * @param {string} phone - Raw phone number input
 * @returns {string} Cleaned phone number with only digits
 */
export const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
};

/**
 * Format phone number for display (XXX-XXX-XXXX)
 * @param {string} phone - Phone number (digits only or with formatting)
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = cleanPhoneNumber(phone);
  
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

/**
 * Format phone number with country code for display (+91 XXXXX XXXXX)
 * @param {string} phone - 10-digit phone number
 * @returns {string} Formatted phone number with country code
 */
export const formatPhoneWithCountryCode = (phone) => {
  const cleaned = cleanPhoneNumber(phone);
  
  if (cleaned.length !== 10) return phone;
  
  return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time', 'full')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return 'Invalid date';
  
  const options = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit', hour12: true },
    full: { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }
  };
  
  return d.toLocaleString('en-IN', options[format] || options.short);
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Format name (trim and capitalize)
 * @param {string} name - Name to format
 * @returns {string} Formatted name
 */
export const formatName = (name) => {
  if (!name) return '';
  return capitalizeWords(name.trim());
};

/**
 * Format email (lowercase and trim)
 * @param {string} email - Email to format
 * @returns {string} Formatted email
 */
export const formatEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (up to 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  const words = name.trim().split(' ').filter(Boolean);
  
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

const formatters = {
  cleanPhoneNumber,
  formatPhoneNumber,
  formatPhoneWithCountryCode,
  formatDate,
  capitalizeWords,
  truncateText,
  formatName,
  formatEmail,
  getInitials
};

export default formatters;
