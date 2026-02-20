/**
 * Lead Model - MongoDB Schema
 * Defines the structure for university lead data
 */

const mongoose = require('mongoose');
const validator = require('validator');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    validate: {
      validator: function(v) {
        // Only letters and spaces allowed
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'Name can only contain letters and spaces'
    }
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        // Must be exactly 10 digits
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Phone number must be a valid 10-digit Indian mobile number'
    }
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  
  stream: {
    type: String,
    required: [true, 'Stream is required'],
    enum: {
      values: ['Science', 'Commerce', 'Humanities'],
      message: 'Stream must be Science, Commerce, or Humanities'
    }
  },
  
  submittedAt: {
    type: Date,
    default: Date.now
  },
  
  callStatus: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'called', 'voicemail', 'incorrect_phone', 'failed'],
      message: 'Invalid call status'
    }
  },
  
  callDetails: {
    type: Object,
    default: {}
  },
  
  webhookStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'sent', 'failed']
  },
  
  webhookAttempts: {
    type: Number,
    default: 0
  },
  
  webhookError: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for faster queries
leadSchema.index({ phoneNumber: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ callStatus: 1 });

// Pre-save middleware to clean phone number
leadSchema.pre('save', function(next) {
  if (this.phoneNumber) {
    // Remove any non-digit characters
    this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
  }
  next();
});

// Virtual for formatted phone display
leadSchema.virtual('formattedPhone').get(function() {
  if (this.phoneNumber && this.phoneNumber.length === 10) {
    return `${this.phoneNumber.slice(0, 3)}-${this.phoneNumber.slice(3, 6)}-${this.phoneNumber.slice(6)}`;
  }
  return this.phoneNumber;
});

// Method to convert to N8N webhook format
leadSchema.methods.toN8NFormat = function() {
  return {
    'Name': this.name,
    'Phone Number': this.phoneNumber,
    'Email': this.email,
    'Stream': this.stream,
    'submittedAt': this.submittedAt.toISOString()
  };
};

// Static method to check if phone exists
leadSchema.statics.phoneExists = async function(phoneNumber) {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const lead = await this.findOne({ phoneNumber: cleanPhone });
  return !!lead;
};

// JSON transformation
leadSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
