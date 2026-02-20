import React, { useState } from 'react';
import { formatPhoneNumber, cleanPhoneNumber } from '../utils/formatters';

/**
 * Phone Input Component
 * Specialized input for Indian phone numbers with auto-formatting
 */
const PhoneInput = ({
  label,
  error,
  state = 'default',
  isChecking = false,
  register,
  setValue,
  clearErrors,
  onBlur,
  validation,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');

  /**
   * Handle input change with auto-formatting
   */
  const handleChange = (e) => {
    const input = e.target.value;
    const cleaned = cleanPhoneNumber(input);
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    
    // Format for display
    const formatted = formatPhoneNumber(limited);
    setDisplayValue(formatted);
    
    // Update form value with clean number
    setValue('phoneNumber', limited, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Clear errors when user starts typing again
    if (error) {
      clearErrors('phoneNumber');
    }
  };

  /**
   * Handle blur event
   */
  const handleBlur = () => {
    const cleaned = cleanPhoneNumber(displayValue);
    if (onBlur && cleaned.length === 10) {
      onBlur(cleaned);
    }
  };

  /**
   * Get input class based on state
   */
  const getInputClass = () => {
    const baseClass = 'w-full px-4 py-3.5 text-gray-900 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-gray-400';
    
    switch (state) {
      case 'error':
        return `${baseClass} border-error-500 focus:border-error-500 focus:ring-error-500/20`;
      case 'success':
        return `${baseClass} border-success-500 focus:border-success-500 focus:ring-success-500/20`;
      default:
        return `${baseClass} border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 hover:border-gray-300`;
    }
  };

  /**
   * Get state icon
   */
  const getStateIcon = () => {
    if (isChecking) {
      return (
        <svg className="animate-spin w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }
    
    switch (state) {
      case 'error':
        return (
          <svg className="w-5 h-5 text-error-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Register the field with react-hook-form
  const { ref } = register('phoneNumber', validation);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-navy-900">
          {label} <span className="text-secondary-500">*</span>
        </label>
      )}
      <div className="relative">
        {/* Country code prefix */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600 border-r border-gray-200 pr-3">
          <span className="text-lg">🇮🇳</span>
          <span className="font-medium text-sm">+91</span>
        </div>
        
        <input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          placeholder="XXXXX-XXXXX"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={ref}
          className={`${getInputClass()} pl-24 pr-10`}
          maxLength={12} // 10 digits + 2 hyphens
          aria-label="Phone number"
          aria-required="true"
          aria-invalid={state === 'error'}
          aria-describedby={error ? 'phone-error' : undefined}
          autoComplete="tel-national"
          {...props}
        />
        
        {/* State icon */}
        {(getStateIcon() || isChecking) && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {getStateIcon()}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p id="phone-error" className="flex items-center gap-1.5 text-sm text-error-500 animate-slide-down" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
      
      {/* Helper text */}
      {!error && (
        <p className="text-xs text-gray-400">
          Enter 10-digit mobile number (e.g., 98765-43210)
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
