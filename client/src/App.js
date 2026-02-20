import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SuccessModal from './components/SuccessModal';

/**
 * Main App Component
 * Handles the overall application state and navigation
 */
function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  /**
   * Handle successful form submission
   * @param {Object} data - The submitted form data
   */
  const handleFormSuccess = (data) => {
    setSubmittedData(data);
    setShowSuccessModal(true);
  };

  /**
   * Close the success modal
   */
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Landing Page with Hero Section and Form */}
      <LandingPage onFormSuccess={handleFormSuccess} />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        data={submittedData}
      />
    </div>
  );
}

export default App;
