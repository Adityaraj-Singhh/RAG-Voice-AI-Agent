/**
 * Phone Validator Tests
 */

const {
  cleanPhoneNumber,
  standardizePhoneNumber,
  validateIndianMobile,
  formatPhoneForDisplay
} = require('../utils/phoneValidator');

describe('Phone Validator', () => {
  describe('cleanPhoneNumber', () => {
    test('removes all non-digit characters', () => {
      expect(cleanPhoneNumber('98765-43210')).toBe('9876543210');
      expect(cleanPhoneNumber('+91 98765 43210')).toBe('919876543210');
      expect(cleanPhoneNumber('(987) 654-3210')).toBe('9876543210');
    });

    test('handles empty input', () => {
      expect(cleanPhoneNumber('')).toBe('');
      expect(cleanPhoneNumber(null)).toBe('');
      expect(cleanPhoneNumber(undefined)).toBe('');
    });
  });

  describe('standardizePhoneNumber', () => {
    test('returns 10-digit number as-is', () => {
      expect(standardizePhoneNumber('9876543210')).toBe('9876543210');
    });

    test('removes +91 country code', () => {
      expect(standardizePhoneNumber('+919876543210')).toBe('9876543210');
      expect(standardizePhoneNumber('919876543210')).toBe('9876543210');
    });

    test('removes leading 0', () => {
      expect(standardizePhoneNumber('09876543210')).toBe('9876543210');
    });

    test('returns incorrect format for invalid numbers', () => {
      expect(standardizePhoneNumber('12345')).toBe('incorrect format');
      expect(standardizePhoneNumber('12345678901234')).toBe('incorrect format');
    });
  });

  describe('validateIndianMobile', () => {
    test('validates correct Indian mobile numbers', () => {
      expect(validateIndianMobile('9876543210').isValid).toBe(true);
      expect(validateIndianMobile('8765432109').isValid).toBe(true);
      expect(validateIndianMobile('7654321098').isValid).toBe(true);
      expect(validateIndianMobile('6543210987').isValid).toBe(true);
    });

    test('rejects numbers not starting with 6-9', () => {
      expect(validateIndianMobile('5876543210').isValid).toBe(false);
      expect(validateIndianMobile('1234567890').isValid).toBe(false);
    });

    test('rejects numbers with wrong length', () => {
      expect(validateIndianMobile('98765432').isValid).toBe(false);
      expect(validateIndianMobile('987654321012').isValid).toBe(false);
    });
  });

  describe('formatPhoneForDisplay', () => {
    test('formats 10-digit number correctly', () => {
      expect(formatPhoneForDisplay('9876543210')).toBe('987-654-3210');
    });

    test('returns input for invalid numbers', () => {
      expect(formatPhoneForDisplay('12345')).toBe('12345');
    });
  });
});
