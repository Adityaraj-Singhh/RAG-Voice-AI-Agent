/**
 * Lead Routes
 * API endpoints for lead management
 */

const express = require('express');
const router = express.Router();

// Controllers
const {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  checkPhoneExists,
  deleteLead,
  getLeadStats
} = require('../controllers/leadController');

// Middleware
const {
  leadValidationRules,
  validate,
  leadSubmissionLimiter
} = require('../middleware');

/**
 * @route   POST /api/leads
 * @desc    Create a new lead
 * @access  Public
 */
router.post(
  '/',
  leadSubmissionLimiter,
  leadValidationRules,
  validate,
  createLead
);

/**
 * @route   GET /api/leads
 * @desc    Get all leads with pagination
 * @access  Private (admin only in production)
 */
router.get('/', getLeads);

/**
 * @route   GET /api/leads/stats
 * @desc    Get lead statistics
 * @access  Private (admin only in production)
 */
router.get('/stats', getLeadStats);

/**
 * @route   POST /api/leads/check-phone
 * @desc    Check if phone number already exists
 * @access  Public
 */
router.post('/check-phone', checkPhoneExists);

/**
 * @route   GET /api/leads/:id
 * @desc    Get a single lead by ID
 * @access  Private (admin only in production)
 */
router.get('/:id', getLeadById);

/**
 * @route   PATCH /api/leads/:id/status
 * @desc    Update lead call status
 * @access  Private (webhook/admin)
 */
router.patch('/:id/status', updateLeadStatus);

/**
 * @route   DELETE /api/leads/:id
 * @desc    Delete a lead
 * @access  Private (admin only)
 */
router.delete('/:id', deleteLead);

module.exports = router;
