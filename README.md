# University Lead Generation System

A complete MERN stack application for university lead generation with AI voice calling integration via N8N and VAPI.

## 🎯 Features

- **Modern Landing Page**: Beautiful hero section, programs showcase, and features
- **Lead Capture Form**: Real-time validation with React Hook Form
- **Phone Number Formatting**: Auto-formatting for Indian mobile numbers
- **N8N Integration**: Webhook triggers for AI voice calling workflow
- **MongoDB Storage**: Secure lead data storage with duplicate prevention
- **Rate Limiting**: Protection against spam submissions
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection
- N8N workflow configured (optional for voice calling)

### Installation

```bash
# Clone the repository
cd "Voice AI Chatbot"

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Setup

1. **Server Configuration** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/university-leads
FRONTEND_URL=http://localhost:3000
N8N_WEBHOOK_URL=your-n8n-webhook-url-here
```

2. **Client Configuration** (`client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
Voice AI Chatbot/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── PhoneInput.jsx
│   │   │   └── SuccessModal.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios API service
│   │   ├── utils/
│   │   │   ├── validation.js   # Form validation
│   │   │   └── formatters.js   # Data formatters
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js backend
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── leadController.js   # Lead business logic
│   ├── middleware/
│   │   ├── validation.js       # Input validation
│   │   ├── rateLimiter.js      # Rate limiting
│   │   ├── errorHandler.js     # Error handling
│   │   └── index.js
│   ├── models/
│   │   └── Lead.js             # Mongoose schema
│   ├── routes/
│   │   └── leads.js            # API routes
│   ├── services/
│   │   └── n8nService.js       # N8N webhook integration
│   ├── utils/
│   │   └── phoneValidator.js   # Phone validation utilities
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 📝 API Documentation

### Endpoints

#### POST /api/leads
Create a new lead submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "phoneNumber": "9876543210",
  "email": "john@example.com",
  "stream": "Science"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Thank you! We will call you shortly to discuss your admission.",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "stream": "Science",
    "submittedAt": "2026-02-01T12:00:00.000Z"
  }
}
```

#### GET /api/leads
Get all leads with pagination (admin feature).

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `stream` - Filter by stream
- `callStatus` - Filter by call status

#### POST /api/leads/check-phone
Check if a phone number already exists.

**Request Body:**
```json
{
  "phoneNumber": "9876543210"
}
```

#### GET /api/health
Health check endpoint.

## 🔄 N8N Workflow Integration

The application sends lead data to N8N webhook in this format:

```json
{
  "Name": "John Doe",
  "Phone Number": "9876543210",
  "Email": "john@example.com",
  "Stream": "Science",
  "submittedAt": "2026-02-01T12:00:00.000Z"
}
```

### Webhook Features:
- 3 retry attempts with exponential backoff
- Async processing (doesn't block user response)
- Detailed logging for debugging
- Graceful error handling

## 📱 Form Fields

| Field | Type | Validation |
|-------|------|------------|
| Name | Text | 2-50 chars, letters and spaces only |
| Phone Number | Tel | 10 digits, Indian mobile format (6-9 start) |
| Email | Email | Valid email format |
| Stream | Dropdown | Science, Commerce, Humanities |

## 🎨 Design System

### Colors
- **Primary**: #0066CC (Blue)
- **Success**: #10B981 (Green)
- **Error**: #EF4444 (Red)
- **Background**: #F9FAFB (Light gray)

### Features
- Mobile-first responsive design
- Smooth animations (200-300ms transitions)
- Accessibility with ARIA labels
- Keyboard navigation support

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Properly configured origins
- **Rate Limiting**: 5 submissions per IP per hour
- **Input Validation**: Server and client-side
- **MongoDB Injection Prevention**: Mongoose sanitization
- **Environment Variables**: Sensitive data protection

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 📦 Production Build

```bash
# Build frontend for production
cd client
npm run build

# Start production server
cd server
NODE_ENV=production npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --dbpath /data/db`
- Check MONGODB_URI in .env file

### CORS Errors
- Verify FRONTEND_URL in server .env matches client URL
- Check browser console for specific CORS errors

### N8N Webhook Not Triggering
- Verify N8N_WEBHOOK_URL is correctly set
- Check server logs for webhook attempts
- Ensure N8N workflow is active

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for University Admissions
