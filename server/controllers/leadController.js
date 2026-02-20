/**
 * Lead Controller
 * Handles all lead-related business logic
 */

const Lead = require('../models/Lead');
const { triggerN8NWebhook, logWebhookAttempt } = require('../services/n8nService');
const { validateIndianMobile, cleanPhoneNumber } = require('../utils/phoneValidator');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');

/**
 * Create a new lead
 * POST /api/leads
 */
const createLead = asyncHandler(async (req, res) => {
  const { name, phoneNumber, email, stream } = req.body;
  
  console.log('📥 Received lead submission:', { name, phoneNumber, email, stream });

  // Clean and validate phone number
  const cleanedPhone = cleanPhoneNumber(phoneNumber);
  const phoneValidation = validateIndianMobile(cleanedPhone);
  
  if (!phoneValidation.isValid) {
    throw new ApiError(400, phoneValidation.message);
  }

  // Create new lead
  const lead = new Lead({
    name: name.trim(),
    phoneNumber: cleanedPhone,
    email: email.toLowerCase().trim(),
    stream,
    submittedAt: new Date(),
    callStatus: 'pending'
  });

  await lead.save();
  console.log('✅ Lead saved to database:', lead._id);

  // Trigger N8N webhook asynchronously (don't block response)
  const webhookPromise = triggerN8NWebhook({
    name: lead.name,
    phoneNumber: lead.phoneNumber,
    email: lead.email,
    stream: lead.stream,
    submittedAt: lead.submittedAt.toISOString()
  }).then(result => {
    logWebhookAttempt(lead._id, result);
    return result;
  }).catch(error => {
    console.error('❌ Webhook error:', error.message);
    logWebhookAttempt(lead._id, { success: false, error: error.message });
  });

  // Don't await webhook - respond to user immediately
  // This ensures the user experience is not blocked by webhook latency
  
  res.status(201).json({
    success: true,
    message: 'Thank you! We will call you shortly to discuss your admission.',
    data: {
      id: lead._id,
      name: lead.name,
      email: lead.email,
      stream: lead.stream,
      submittedAt: lead.submittedAt
    }
  });

  // Log webhook result after response is sent
  webhookPromise.then(result => {
    if (result) {
      console.log('📞 Webhook processing complete:', result.success ? 'Success' : 'Failed');
    }
  });
});

/**
 * Get all leads with pagination
 * GET /api/leads
 */
const getLeads = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  // Build filter query
  const filter = {};
  
  if (req.query.stream) {
    filter.stream = req.query.stream;
  }
  
  if (req.query.callStatus) {
    filter.callStatus = req.query.callStatus;
  }
  
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { phoneNumber: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: {
      leads,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    }
  });
});

/**
 * Get a single lead by ID
 * GET /api/leads/:id
 */
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  
  res.json({
    success: true,
    data: lead
  });
});

/**
 * Update lead call status
 * PATCH /api/leads/:id/status
 */
const updateLeadStatus = asyncHandler(async (req, res) => {
  const { callStatus, callDetails } = req.body;
  
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    {
      callStatus,
      callDetails,
      updatedAt: new Date()
    },
    { new: true, runValidators: true }
  );
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  
  console.log(`📞 Lead status updated: ${lead._id} -> ${callStatus}`);
  
  res.json({
    success: true,
    message: 'Lead status updated successfully',
    data: lead
  });
});

/**
 * Check if phone number exists
 * POST /api/leads/check-phone
 */
const checkPhoneExists = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  
  const cleanedPhone = cleanPhoneNumber(phoneNumber);
  const exists = await Lead.phoneExists(cleanedPhone);
  
  res.json({
    success: true,
    data: {
      exists,
      message: exists ? 'This phone number is already registered' : 'Phone number is available'
    }
  });
});

/**
 * Delete a lead
 * DELETE /api/leads/:id
 */
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  
  console.log(`🗑️ Lead deleted: ${lead._id}`);
  
  res.json({
    success: true,
    message: 'Lead deleted successfully'
  });
});

/**
 * Get lead statistics
 * GET /api/leads/stats
 */
const getLeadStats = asyncHandler(async (req, res) => {
  const stats = await Lead.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: {
          $sum: { $cond: [{ $eq: ['$callStatus', 'pending'] }, 1, 0] }
        },
        called: {
          $sum: { $cond: [{ $eq: ['$callStatus', 'called'] }, 1, 0] }
        },
        voicemail: {
          $sum: { $cond: [{ $eq: ['$callStatus', 'voicemail'] }, 1, 0] }
        }
      }
    }
  ]);

  const streamStats = await Lead.aggregate([
    {
      $group: {
        _id: '$stream',
        count: { $sum: 1 }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      overview: stats[0] || { total: 0, pending: 0, called: 0, voicemail: 0 },
      byStream: streamStats
    }
  });
});

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  checkPhoneExists,
  deleteLead,
  getLeadStats
};
