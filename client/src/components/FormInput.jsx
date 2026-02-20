import React, { forwardRef } from 'react';

/**
 * Form Input Component
 * Reusable input component with validation states
 */
const FormInput = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  state = 'default',
  className = '',
  ...props
}, ref) => {
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
   * Get icon based on state
   */
  const getStateIcon = () => {
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

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-navy-900">
          {label} <span className="text-secondary-500">*</span>
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${getInputClass()} pr-10`}
          {...props}
        />
        {getStateIcon() && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getStateIcon()}
          </div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-sm text-error-500 animate-slide-down" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
