import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormInput from './FormInput';
import PhoneInput from './PhoneInput';
import { submitLead } from '../services/api';
import { validateName, validateEmail, validatePhone } from '../utils/validation';

/**
 * Lead Form Component
 * Handles the lead capture form with validation
 */
const LeadForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
    setValue,
    setError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      stream: 'Science'
    }
  });

  const watchedFields = watch();

  /**
   * Handle form submission
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Clean phone number before submission
      const cleanPhone = data.phoneNumber.replace(/\D/g, '');
      
      const submitData = {
        name: data.name.trim(),
        phoneNumber: cleanPhone,
        email: data.email.toLowerCase().trim(),
        stream: data.stream
      };

      console.log('📤 Submitting lead:', submitData);
      
      const response = await submitLead(submitData);
      
      console.log('✅ Lead submitted successfully:', response);
      
      // Reset form
      reset();
      
      // Trigger success callback
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      toast.success('Application submitted successfully!');
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Something went wrong. Please try again.';
      
      // Handle specific error types
      if (error.response?.status === 429) {
        toast.error('Too many attempts. Please try again later.');
      } else if (error.response?.data?.errors) {
        // Handle validation errors from server
        error.response.data.errors.forEach(err => {
          setError(err.field, {
            type: 'server',
            message: err.message
          });
        });
        toast.error('Please fix the errors in the form');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Get field validation state
   */
  const getFieldState = (fieldName) => {
    if (errors[fieldName]) return 'error';
    if (touchedFields[fieldName] && watchedFields[fieldName]) return 'success';
    return 'default';
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white rounded-3xl shadow-card-lg p-8 md:p-10 max-w-xl mx-auto animate-slide-up border border-gray-100"
      noValidate
    >
      {/* Header with gradient accent */}
      <div className="relative text-center mb-8">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
            <span className="text-4xl">🎓</span>
          </div>
        </div>
        <div className="pt-12">
          <span className="inline-block bg-secondary-100 text-secondary-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            QUICK APPLY
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-900 mb-2">
            Start Your Journey
          </h3>
          <p className="text-gray-600">
            Fill out the form and our admissions team will reach you within 24 hours
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your full name"
          error={errors.name?.message}
          state={getFieldState('name')}
          {...register('name', {
            required: 'Name is required',
            validate: validateName
          })}
          aria-label="Full name"
          aria-required="true"
          aria-invalid={!!errors.name}
        />

        {/* Phone Number Field */}
        <PhoneInput
          label="Phone Number"
          error={errors.phoneNumber?.message}
          state={getFieldState('phoneNumber')}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          validation={{
            required: 'Phone number is required',
            validate: validatePhone
          }}
        />

        {/* Email Field */}
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          state={getFieldState('email')}
          {...register('email', {
            required: 'Email is required',
            validate: validateEmail
          })}
          aria-label="Email address"
          aria-required="true"
          aria-invalid={!!errors.email}
        />

        {/* Stream Dropdown */}
        <div className="space-y-2">
          <label htmlFor="stream" className="block text-sm font-semibold text-navy-900">
          Stream <span className="text-secondary-500">*</span>
          </label>
          <div className="relative">
            <select
              id="stream"
              className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white cursor-pointer appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                errors.stream 
                  ? 'border-error-500 focus:border-error-500' 
                  : 'border-gray-200 focus:border-primary-500 hover:border-gray-300'
              }`}
              {...register('stream', {
                required: 'Please select a stream'
              })}
              aria-label="Academic stream"
              aria-required="true"
            >
              <option value="Science"> Science (PCM/PCB)</option>
              <option value="Commerce"> Commerce (Accounts/Business)</option>
              <option value="Humanities"> Humanities (Arts/Social Science)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.stream && (
            <p className="flex items-center gap-1.5 text-sm text-error-500 mt-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.stream.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-6 ${
            isSubmitting ? 'opacity-75 cursor-wait' : ''
          }`}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Application...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Submit Application
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Process
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            24hr Callback
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          By submitting, you agree to receive a call from our admissions team. 
          Your information is secure and will not be shared with third parties.
        </p>
      </div>
    </form>
  );
};

export default LeadForm;
