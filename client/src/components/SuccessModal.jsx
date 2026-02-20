import React, { useEffect } from 'react';

/**
 * Success Modal Component
 * Displays a success message after form submission
 */
const SuccessModal = ({ isOpen, onClose, data }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-bounce-in">
        {/* Top gradient accent */}
        <div className="h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
        
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Icon */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 animate-scale-in shadow-lg rotate-3">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Title */}
            <h2 id="modal-title" className="text-2xl font-display font-bold text-navy-900 mb-3">
              Application Submitted! 🎉
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you{data?.name ? `, ${data.name.split(' ')[0]}` : ''}! Your application for the{' '}
              <span className="font-semibold text-primary-600">{data?.stream || 'selected'}</span> program has been received.
            </p>

            {/* Phone Call Animation */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-5 mb-6 border border-primary-100">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center animate-pulse-slow shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-navy-900">
                    Expect a call from our AI Assistant
                  </p>
                  <p className="text-xs text-gray-600">
                    Usually within the next few minutes
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="text-left bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
              <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
                <span className="text-lg">📋</span> What happens next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-xs font-bold text-blue-600">1</span>
                  <span>You'll receive a call from our AI assistant</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-xs font-bold text-green-600">2</span>
                  <span>Answer a few quick questions about your goals</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs font-bold text-purple-600">3</span>
                  <span>Get personalized admission guidance</span>
                </li>
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
              autoFocus
            >
              Got it, thanks! 👍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
