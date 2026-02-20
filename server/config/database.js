/**
 * MongoDB Database Configuration
 * Handles connection to MongoDB with connection pooling and error handling
 * Optimized for serverless environments (Vercel, AWS Lambda, etc.)
 */

const mongoose = require('mongoose');

let isConnected = false; // Track connection status

/**
 * Connect to MongoDB database
 * Reuses existing connection in serverless environments
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  // Reuse existing connection if available (important for serverless)
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('♻️ Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/university-leads';
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined');
    }

    // MongoDB connection options optimized for serverless
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // 10 seconds for serverless
      socketTimeoutMS: 45000,
      family: 4,
      bufferCommands: false, // Disable mongoose buffering
    };

    await mongoose.connect(mongoURI, options);
    isConnected = true;

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    console.log(`📊 Database: ${mongoose.connection.name}`);

    // Handle connection events
    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error(`❌ Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.log('⚠️ Mongoose disconnected from MongoDB');
    });

  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error; // Re-throw to be handled by calling function
  }
};

module.exports = connectDB;
