/**
 * API Service
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    
    // Handle specific error codes
    if (error.response?.status === 429) {
      error.message = 'Too many requests. Please wait a moment before trying again.';
    } else if (error.response?.status === 503) {
      error.message = 'Service temporarily unavailable. Please try again later.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your internet connection.';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Submit a new lead
 * @param {Object} leadData - The lead form data
 * @param {string} leadData.name - Lead name
 * @param {string} leadData.phoneNumber - 10-digit phone number
 * @param {string} leadData.email - Email address
 * @param {string} leadData.stream - Selected stream (Science/Commerce/Humanities)
 * @returns {Promise<Object>} API response
 */
export const submitLead = async (leadData) => {
  try {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if phone number already exists
 * @param {string} phoneNumber - 10-digit phone number to check
 * @returns {Promise<Object>} { exists: boolean, message: string }
 */
export const checkPhoneExists = async (phoneNumber) => {
  try {
    const response = await api.post('/api/leads/check-phone', { phoneNumber });
    return response.data.data;
  } catch (error) {
    // Don't throw for phone check - just return not exists
    console.warn('Phone check failed:', error.message);
    return { exists: false, message: 'Unable to verify' };
  }
};

/**
 * Get all leads (admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.stream - Filter by stream
 * @param {string} params.callStatus - Filter by call status
 * @returns {Promise<Object>} Paginated leads response
 */
export const getLeads = async (params = {}) => {
  try {
    const response = await api.get('/api/leads', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get lead by ID (admin)
 * @param {string} id - Lead ID
 * @returns {Promise<Object>} Lead data
 */
export const getLeadById = async (id) => {
  try {
    const response = await api.get(`/api/leads/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get lead statistics (admin)
 * @returns {Promise<Object>} Lead statistics
 */
export const getLeadStats = async () => {
  try {
    const response = await api.get('/api/leads/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
