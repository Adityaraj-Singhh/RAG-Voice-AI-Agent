/**
 * N8N Webhook Service
 * Handles integration with N8N workflow automation
 */

const axios = require('axios');

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

/**
 * Sleep function for delay between retries
 * @param {number} ms - Milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay
 * @param {number} attempt - Current attempt number (0-indexed)
 * @returns {number} Delay in milliseconds
 */
const getRetryDelay = (attempt) => {
  return INITIAL_RETRY_DELAY * Math.pow(2, attempt);
};

/**
 * Send lead data to N8N webhook
 * @param {Object} leadData - Lead data to send
 * @param {string} leadData.Name - Lead name
 * @param {string} leadData.PhoneNumber - Lead phone number
 * @param {string} leadData.Email - Lead email
 * @param {string} leadData.Stream - Lead stream
 * @param {Date} leadData.submittedAt - Submission timestamp
 * @returns {Promise<Object>} Webhook response
 */
const triggerN8NWebhook = async (leadData) => {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('⚠️ N8N_WEBHOOK_URL not configured. Skipping webhook trigger.');
    return {
      success: false,
      error: 'Webhook URL not configured',
      skipped: true
    };
  }

  // Format data for N8N webhook (matching the expected format from the workflow)
  const payload = {
    'Name': leadData.name,
    'Phone Number': String(leadData.phoneNumber), // Ensure it's a string
    'Email': leadData.email,
    'Stream': leadData.stream,
    'submittedAt': leadData.submittedAt || new Date().toISOString()
  };

  console.log('📤 Preparing to send webhook to N8N:', {
    url: webhookUrl,
    payload: payload
  });

  let lastError = null;
  
  // Retry loop with exponential backoff
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`🔄 Webhook attempt ${attempt + 1}/${MAX_RETRIES}...`);
      
      const response = await axios.post(webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'UniversityLeads-Server/1.0'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('✅ N8N webhook triggered successfully:', {
        status: response.status,
        statusText: response.statusText,
        attempt: attempt + 1
      });

      return {
        success: true,
        status: response.status,
        data: response.data,
        attempts: attempt + 1
      };

    } catch (error) {
      lastError = error;
      
      console.error(`❌ Webhook attempt ${attempt + 1} failed:`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      // Don't retry on client errors (4xx) except timeout
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        console.log('⏹️ Client error detected, not retrying.');
        break;
      }

      // Wait before retrying (except on last attempt)
      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await sleep(delay);
      }
    }
  }

  // All retries failed
  console.error('❌ All webhook attempts failed:', {
    totalAttempts: MAX_RETRIES,
    lastError: lastError?.message
  });

  return {
    success: false,
    error: lastError?.message || 'Unknown error',
    status: lastError?.response?.status,
    attempts: MAX_RETRIES
  };
};

/**
 * Log webhook attempt to database
 * @param {string} leadId - Lead document ID
 * @param {Object} result - Webhook result
 */
const logWebhookAttempt = async (leadId, result) => {
  try {
    const Lead = require('../models/Lead');
    
    await Lead.findByIdAndUpdate(leadId, {
      webhookStatus: result.success ? 'sent' : 'failed',
      webhookAttempts: result.attempts || 1,
      webhookError: result.error || null,
      $push: {
        'callDetails.webhookLogs': {
          timestamp: new Date(),
          success: result.success,
          error: result.error,
          attempts: result.attempts
        }
      }
    });
    
    console.log(`📝 Webhook attempt logged for lead: ${leadId}`);
  } catch (error) {
    console.error('❌ Failed to log webhook attempt:', error.message);
  }
};

module.exports = {
  triggerN8NWebhook,
  logWebhookAttempt
};
