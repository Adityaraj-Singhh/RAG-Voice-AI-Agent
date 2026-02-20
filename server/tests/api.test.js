/**
 * API Endpoint Tests
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Connect to test database
    const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/university-leads-test';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(testDbUri);
    }
  });

  afterAll(async () => {
    // Cleanup and disconnect
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /api/health', () => {
    test('returns health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('running');
    });
  });

  describe('POST /api/leads', () => {
    test('creates a new lead with valid data', async () => {
      const leadData = {
        name: 'Test User',
        phoneNumber: '9876543210',
        email: 'test@example.com',
        stream: 'Science'
      };

      const response = await request(app)
        .post('/api/leads')
        .send(leadData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test User');
      expect(response.body.data.email).toBe('test@example.com');
    });

    test('rejects invalid phone number', async () => {
      const leadData = {
        name: 'Test User',
        phoneNumber: '12345',
        email: 'test2@example.com',
        stream: 'Commerce'
      };

      const response = await request(app)
        .post('/api/leads')
        .send(leadData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('rejects invalid email', async () => {
      const leadData = {
        name: 'Test User',
        phoneNumber: '8765432109',
        email: 'invalid-email',
        stream: 'Humanities'
      };

      const response = await request(app)
        .post('/api/leads')
        .send(leadData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('rejects duplicate phone number', async () => {
      // First submission
      await request(app)
        .post('/api/leads')
        .send({
          name: 'First User',
          phoneNumber: '7654321098',
          email: 'first@example.com',
          stream: 'Science'
        });

      // Duplicate phone
      const response = await request(app)
        .post('/api/leads')
        .send({
          name: 'Second User',
          phoneNumber: '7654321098',
          email: 'second@example.com',
          stream: 'Commerce'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already registered');
    });

    test('rejects missing required fields', async () => {
      const response = await request(app)
        .post('/api/leads')
        .send({
          name: 'Test User'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/leads/check-phone', () => {
    test('returns exists: false for new phone', async () => {
      const response = await request(app)
        .post('/api/leads/check-phone')
        .send({ phoneNumber: '9999999999' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.exists).toBe(false);
    });
  });

  describe('GET /api/leads', () => {
    test('returns paginated leads', async () => {
      const response = await request(app)
        .get('/api/leads')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.leads).toBeDefined();
      expect(response.body.data.pagination).toBeDefined();
    });
  });
});
