# FlacronAI - Complete Technical Documentation

**AI-Powered Insurance Inspection Report Generator**

Version: 1.0.0
Last Updated: December 7, 2024
Author: Flacron Enterprises

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Backend Documentation](#backend-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [API Reference](#api-reference)
7. [Database Schema](#database-schema)
8. [Authentication Flow](#authentication-flow)
9. [Security](#security)
10. [Deployment](#deployment)
11. [File Structure](#file-structure)

---

## Project Overview

### What is FlacronAI?

FlacronAI is a mobile and web application that uses Google Gemini AI to generate professional insurance inspection reports from photos and claim details. The system helps insurance adjusters create comprehensive, AI-powered reports in minutes instead of hours.

### Key Features

- 📸 **Photo-based Inspection** - Upload photos of damaged property
- 🤖 **AI Report Generation** - Google Gemini creates detailed reports
- 📄 **Multiple Export Formats** - Download as PDF or DOCX
- 👤 **User Authentication** - Firebase Auth with email verification
- 💳 **Subscription Tiers** - Starter, Professional, Agency, Enterprise
- 📊 **Usage Tracking** - Monitor report generation limits
- 📱 **Mobile App** - React Native (iOS & Android)
- 🌐 **Web Dashboard** - React web application

### User Workflow

```
1. User signs up → Email verification required
2. User logs in → Access dashboard
3. User creates report → Fill claim details + upload photos
4. AI generates report → Google Gemini processes data
5. User downloads report → PDF or DOCX format
6. Reports saved → View in "My Reports" section
```

---

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Mobile App    │ (React Native - Expo)
│  (iOS/Android)  │
└────────┬────────┘
         │
         │ HTTPS/REST API
         │
┌────────▼────────┐
│   Web Dashboard │ (React + Vite)
└────────┬────────┘
         │
         │ HTTPS/REST API
         │
┌────────▼────────┐
│  Backend Server │ (Node.js + Express)
│  (Render.com)   │
└────────┬────────┘
         │
         ├──────────────┬──────────────┬──────────────┐
         │              │              │              │
┌────────▼────────┐ ┌──▼──────────┐ ┌─▼──────────┐ ┌─▼──────────┐
│ Firebase Auth   │ │  Firestore  │ │   Gemini   │ │   Stripe   │
│ (User Auth)     │ │  (Database) │ │  (AI API)  │ │ (Payments) │
└─────────────────┘ └─────────────┘ └────────────┘ └────────────┘
```

### Component Interaction

```
Mobile App/Web → Backend API → Firebase Admin SDK → Firebase Services
                            → Google Gemini API → AI Processing
                            → PDFKit/DOCX → Document Generation
                            → Stripe API → Payment Processing
```

---

## Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x | JavaScript runtime |
| **Express.js** | 4.21.2 | Web framework |
| **Firebase Admin SDK** | 13.0.2 | Authentication & Database |
| **Google Generative AI** | 0.21.0 | AI report generation |
| **PDFKit** | 0.15.1 | PDF generation |
| **DOCX** | 9.0.2 | Word document generation |
| **Mammoth** | 1.11.0 | DOCX to HTML conversion |
| **Multer** | 1.4.5 | File upload handling |
| **JWT** | 9.0.2 | Token-based auth |
| **Stripe** | 19.1.0 | Payment processing |
| **Helmet** | 8.0.0 | Security headers |
| **CORS** | 2.8.5 | Cross-origin requests |

### Frontend Technologies (Mobile App)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | Latest | Mobile framework |
| **Expo** | Latest | Development platform |
| **React** | 18.x | UI library |
| **AsyncStorage** | Latest | Local data storage |
| **Expo Image Picker** | Latest | Photo selection |
| **Expo File System** | Latest | File operations |
| **Expo Sharing** | Latest | Share files |
| **Expo Haptics** | Latest | Haptic feedback |
| **Ionicons** | Latest | Icon library |

### Frontend Technologies (Web Dashboard)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI library |
| **Vite** | Latest | Build tool |
| **TailwindCSS** | Latest | Styling |
| **Firebase SDK** | 10.x | Firebase client |
| **React Router** | Latest | Routing |
| **React Markdown** | Latest | Markdown rendering |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Render.com** | Backend hosting |
| **Firebase Authentication** | User authentication |
| **Cloud Firestore** | NoSQL database |
| **Google Gemini API** | AI processing |
| **Stripe** | Payment processing |
| **GitHub** | Version control |

---

## Backend Documentation

### Project Structure

```
backend/
├── config/
│   └── firebase.js              # Firebase Admin initialization
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   ├── reports.js               # Report generation endpoints
│   ├── usage.js                 # Usage tracking endpoints
│   └── stripe.js                # Stripe payment endpoints
├── services/
│   └── (emailService.js removed) # Previously used for SMTP
├── uploads/                     # Temporary file storage (ephemeral)
├── utils/                       # Utility functions
├── server.js                    # Main server file
├── package.json                 # Dependencies
└── .env                         # Environment variables
```

### Server Configuration (server.js)

**Port:** 3000 (default) or environment variable
**CORS:** Configured for all origins (should be restricted in production)
**File Upload:** 50MB limit via express-fileupload
**Security:** Helmet.js for HTTP headers

```javascript
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/stripe', stripeRoutes);
```

### Environment Variables

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=flacronai
FIREBASE_PRIVATE_KEY=<service-account-private-key>
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@flacronai.iam.gserviceaccount.com
FIREBASE_API_KEY=AIzaSyAEtWQZaTf8czc8tLdMatYSnAUhIOyCOis

# Google Gemini AI
GEMINI_API_KEY=<your-gemini-api-key>

# JWT Secret (for mobile app tokens)
JWT_SECRET=flacronai-mobile-secret-2024

# Stripe (for payments)
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>

# Server Configuration
PORT=3000
NODE_ENV=production
```

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`

**Purpose:** Create new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created! Please check your email to verify your account.",
  "userId": "firebase-user-id",
  "emailSent": true
}
```

**Process:**
1. Validate email, password (min 6 chars)
2. Create user in Firebase Auth
3. Create user document in Firestore
4. Sign in user to get idToken
5. Send verification email via Firebase REST API

**Firebase REST API Used:**
```
POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword
POST https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode
```

---

#### POST `/api/auth/login`

**Purpose:** Authenticate user and return JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "userId": "firebase-user-id",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": true,
    "createdAt": "2024-12-07T10:00:00.000Z",
    "tier": "starter",
    "reportsGenerated": 0
  }
}
```

**Process:**
1. Verify password using Firebase Auth REST API
2. Check if email is verified
3. Get user data from Firestore
4. Create JWT token (valid 30 days)
5. Return token + user data

**Error Responses:**
- Email not verified → Show verification screen
- Wrong password → 401 error
- User not found → 401 error

---

#### POST `/api/auth/resend-verification`

**Purpose:** Resend email verification link

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent!",
  "emailSent": true
}
```

**Process:**
1. Check if user exists
2. Check if already verified
3. Sign in to get idToken
4. Call Firebase sendOobCode API
5. Firebase sends email automatically

---

#### POST `/api/auth/check-verification`

**Purpose:** Check if user's email is verified

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "emailVerified": true,
  "message": "Email is verified. You can login now."
}
```

---

#### GET `/api/auth/me`

**Purpose:** Get current user information

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "firebase-user-id",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": true,
    "tier": "starter",
    "reportsGenerated": 5
  }
}
```

---

### Report Routes (`/api/reports`)

#### POST `/api/reports/generate`

**Purpose:** Generate AI-powered inspection report

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "claimNumber": "CLM-2024-12345",
  "insuredName": "John Doe",
  "lossDate": "2024-12-01",
  "lossType": "Fire",
  "reportType": "Preliminary",
  "propertyAddress": "123 Main St, City, State 12345",
  "propertyDetails": "2-story residential home",
  "lossDescription": "Fire damage to kitchen and living room",
  "damages": "Structural damage to walls, ceiling damage",
  "recommendations": "Full renovation required"
}
```

**Response:**
```json
{
  "success": true,
  "report": {
    "reportId": "generated-report-id",
    "userId": "firebase-user-id",
    "claimNumber": "CLM-2024-12345",
    "content": "# INSURANCE INSPECTION REPORT\n\n## Claim Information...",
    "createdAt": "2024-12-07T10:00:00.000Z",
    "metadata": {
      "insuredName": "John Doe",
      "lossType": "Fire",
      "reportType": "Preliminary"
    }
  }
}
```

**Process:**
1. Authenticate user via JWT
2. Check usage limits (tier-based)
3. Validate required fields
4. Send data to Google Gemini API
5. Parse AI response (markdown format)
6. Save report to Firestore
7. Update usage statistics
8. Return generated report

**AI Prompt Template:**
```
You are an expert insurance claims adjuster creating a detailed inspection report.

CLAIM INFORMATION:
- Claim Number: {claimNumber}
- Insured Name: {insuredName}
- Loss Date: {lossDate}
- Loss Type: {lossType}
- Report Type: {reportType}

PROPERTY INFORMATION:
- Address: {propertyAddress}
- Details: {propertyDetails}

LOSS DETAILS:
- Description: {lossDescription}
- Damages: {damages}

Create a comprehensive inspection report in markdown format with sections:
1. Executive Summary
2. Property Information
3. Loss Description
4. Damage Assessment
5. Recommendations
6. Conclusion
```

---

#### GET `/api/reports`

**Purpose:** Get user's reports

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "reports": [
    {
      "reportId": "report-1",
      "claimNumber": "CLM-2024-12345",
      "createdAt": "2024-12-07T10:00:00.000Z",
      "metadata": {
        "insuredName": "John Doe",
        "lossType": "Fire"
      }
    }
  ]
}
```

---

#### POST `/api/reports/:reportId/export`

**Purpose:** Export report as PDF or DOCX

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "format": "pdf"  // or "docx"
}
```

**Response:**
```json
{
  "success": true,
  "downloadUrl": "/uploads/FlacronAI_CLM-2024-12345.pdf"
}
```

**Process:**
1. Validate report ownership
2. Get report content from Firestore
3. Generate PDF using PDFKit or DOCX using docx library
4. Save to `/uploads` directory
5. Return download URL

**PDF Generation (PDFKit):**
```javascript
const doc = new PDFDocument({ margin: 50 });
doc.fontSize(24).text('INSURANCE INSPECTION REPORT', { align: 'center' });
doc.fontSize(12).text(reportContent);
doc.end();
```

**DOCX Generation (docx library):**
```javascript
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({ text: 'INSURANCE INSPECTION REPORT', heading: HeadingLevel.TITLE }),
      // ... content paragraphs
    ]
  }]
});
```

---

### Usage Routes (`/api/usage`)

#### GET `/api/usage/stats`

**Purpose:** Get user's usage statistics

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "usage": {
    "userId": "firebase-user-id",
    "tier": "starter",
    "limit": 50,
    "periodUsage": 5,
    "currentPeriod": "2024-12",
    "reportsGenerated": 5
  }
}
```

**Tier Limits:**
- **Starter:** 50 reports/month
- **Professional:** 200 reports/month
- **Agency:** 500 reports/month
- **Enterprise:** Unlimited

---

### Stripe Routes (`/api/stripe`)

**Note:** Stripe integration is partially implemented but not fully functional.

#### POST `/api/stripe/create-checkout-session`

**Purpose:** Create Stripe checkout session for subscription

**Request Body:**
```json
{
  "tier": "professional"  // or "agency", "enterprise"
}
```

#### POST `/api/stripe/webhook`

**Purpose:** Handle Stripe webhook events

**Events Handled:**
- `checkout.session.completed` - Upgrade user tier
- `customer.subscription.deleted` - Downgrade user tier

---

## Frontend Documentation

### Mobile App Structure

```
MobileApp/
├── App.js                       # Main application file (2600+ lines)
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── assets/
│   ├── icon.png                 # App icon
│   ├── splash.png               # Splash screen
│   ├── android/                 # Android icon assets
│   └── ios/                     # iOS icon assets
└── android/                     # Android native build (generated)
```

### App.js Architecture

**Total Lines:** ~2660 lines
**Components:** Single-file architecture (should be refactored)
**State Management:** React Hooks (useState, useEffect)

#### Main Sections:

1. **Imports & Setup** (Lines 1-97)
2. **Color Themes** (Lines 38-97)
3. **Styles** (Lines 98-1081)
4. **Main Component** (Lines 1084-2658)
   - State declarations
   - Helper functions
   - Event handlers
   - Screen renderers
   - Modal components

---

### Mobile App Screens

#### 1. Authentication Screen

**File Location:** App.js (Lines 1780-1870)

**States:**
- `isLogin` - Toggle between login/signup
- `email` - Email input
- `password` - Password input
- `displayName` - Display name (signup only)
- `showPassword` - Toggle password visibility

**Features:**
- Email/password login
- Email/password signup
- Password visibility toggle
- Switch between login/signup
- Auto-focus on inputs
- Haptic feedback

**UI Elements:**
```
┌────────────────────────┐
│    FlacronAI Logo      │
│    Welcome back!       │
│                        │
│  [Email Input]         │
│  [Password Input] 👁️   │
│                        │
│  [Login Button]        │
│                        │
│  Don't have account?   │
│  Sign up              │
└────────────────────────┘
```

---

#### 2. Email Verification Screen

**File Location:** App.js (Lines 1710-1778)

**State:**
- `showVerificationScreen` - Show/hide screen
- `pendingVerificationEmail` - Email being verified
- `pendingVerificationPassword` - Temporary password storage
- `resendingVerification` - Loading state

**Features:**
- Email verification message
- Resend verification button
- Check verification status
- Back to login

**UI Elements:**
```
┌────────────────────────┐
│    📧 Mail Icon        │
│  Verify Your Email     │
│                        │
│  Email sent to:        │
│  user@example.com      │
│                        │
│  [Info Box]            │
│  Check inbox/spam      │
│                        │
│  [I've Verified ✓]     │
│  [Resend Email 🔄]     │
│                        │
│  ← Back to Login       │
└────────────────────────┘
```

---

#### 3. Dashboard Screen

**File Location:** App.js (Lines 1889-1973)

**Features:**
- Welcome message with user name
- Usage statistics card (used/limit/tier)
- Quick action buttons
  - Generate Report
  - View Reports
  - Manage Subscription
  - Settings

**Usage Stats Display:**
```javascript
const UsageStatsCard = () => (
  <View>
    <Text>Usage Statistics</Text>
    <Row>
      <Stat icon="document-text" value={5} label="Used" />
      <Stat icon="checkmark-circle" value={50} label="Limit" />
      <Stat icon="ribbon" value="Starter" label="Tier" />
    </Row>
  </View>
);
```

---

#### 4. Generate Report Screen

**File Location:** App.js (Lines 2048-2295)

**Form Fields:**
- Claim Number (required)
- Insured Name (required)
- Loss Date
- Loss Type (dropdown: Fire, Water, Storm, Theft, Vandalism, Other)
- Report Type (dropdown: Preliminary, Final, Supplemental)
- Property Address
- Property Details
- Loss Description
- Damages
- Recommendations

**Photo Upload:**
- Gallery selection (multiple)
- Camera capture
- Photo preview with remove option

**Actions:**
- Generate Report (AI button)
- Quick Demo (pre-filled data)
- Clear Form

**Report Generation Flow:**
```
User fills form
  ↓
User clicks "Generate Report with AI"
  ↓
Loading state (generating = true)
  ↓
API call to /api/reports/generate
  ↓
Modal shows with report preview
  ↓
User can download PDF or DOCX
```

---

#### 5. Report Preview Modal

**File Location:** App.js (Lines 2598-2656)

**Layout:**
```
┌──────────────────────────────┐
│ Report Generated ✓        ✕  │ ← Header
├──────────────────────────────┤
│                              │
│  [Scrollable Report Content] │ ← Body
│                              │
│                              │
├──────────────────────────────┤
│ [Download PDF] [Download DOCX]│ ← Footer
└──────────────────────────────┘
```

**Features:**
- Scrollable report preview
- Download PDF button (red)
- Download DOCX button (blue)
- Close button (X)
- Dark overlay background

**Styling:**
- Centered modal
- 90% max height
- Professional spacing
- Shadow/elevation effects

---

#### 6. My Reports Screen

**File Location:** App.js (Lines 2296-2413)

**Features:**
- List of generated reports
- Pull to refresh
- Empty state message
- Report cards with:
  - Claim number
  - Insured name
  - Creation date
  - Loss type badge

**Report Card:**
```javascript
<TouchableOpacity onPress={() => viewReport(report)}>
  <View style={reportCard}>
    <View>
      <Text>{report.claimNumber}</Text>
      <Text>{report.metadata.insuredName}</Text>
      <Text>{formatDate(report.createdAt)}</Text>
    </View>
    <Badge>{report.metadata.lossType}</Badge>
  </View>
</TouchableOpacity>
```

---

#### 7. Report Detail Screen (Modal)

**File Location:** App.js (Lines 1976-2047)

**Features:**
- Full report content (markdown)
- Download buttons (PDF/DOCX)
- Back button
- Scrollable content

**Actions:**
- View report content
- Download PDF
- Download DOCX
- Close modal

---

#### 8. Profile Screen

**File Location:** App.js (Lines 2414-2478)

**Information Displayed:**
- Display name
- Email address
- Email verification status
- Subscription tier
- Member since date

**Actions:**
- Logout button

**Missing Features:**
- Change password
- Update profile
- Delete account
- Manage subscription

---

### Mobile App State Management

#### User State
```javascript
const [user, setUser] = useState(null);
const [token, setToken] = useState(null);
const [loading, setLoading] = useState(true);
```

#### Authentication State
```javascript
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [displayName, setDisplayName] = useState('');
const [showPassword, setShowPassword] = useState(false);
```

#### Email Verification State
```javascript
const [showVerificationScreen, setShowVerificationScreen] = useState(false);
const [pendingVerificationEmail, setPendingVerificationEmail] = useState('');
const [pendingVerificationPassword, setPendingVerificationPassword] = useState('');
const [resendingVerification, setResendingVerification] = useState(false);
```

#### Report Generation State
```javascript
const [formData, setFormData] = useState({
  claimNumber: '',
  insuredName: '',
  lossDate: '',
  lossType: 'Fire',
  reportType: 'Preliminary',
  propertyAddress: '',
  propertyDetails: '',
  lossDescription: '',
  damages: '',
  recommendations: '',
});
const [photos, setPhotos] = useState([]);
const [generatedReport, setGeneratedReport] = useState('');
const [generating, setGenerating] = useState(false);
const [showReportModal, setShowReportModal] = useState(false);
const [currentGeneratedReport, setCurrentGeneratedReport] = useState(null);
```

#### Reports State
```javascript
const [myReports, setMyReports] = useState([]);
const [loadingReports, setLoadingReports] = useState(false);
const [selectedReport, setSelectedReport] = useState(null);
const [refreshing, setRefreshing] = useState(false);
```

#### Usage State
```javascript
const [usageStats, setUsageStats] = useState(null);
```

#### Navigation State
```javascript
const [currentPage, setCurrentPage] = useState('dashboard');
```

#### Theme State
```javascript
const [isDarkMode, setIsDarkMode] = useState(false);
```

---

### Mobile App Key Functions

#### Authentication Functions

**checkSavedSession()**
- Called on app startup
- Retrieves token from AsyncStorage
- Validates token and loads user data

**handleRegister()**
- Validates form fields
- Calls `/api/auth/register`
- Shows verification screen
- Stores email and password for resend

**handleLogin()**
- Validates credentials
- Calls `/api/auth/login`
- Saves token to AsyncStorage
- Loads user data
- Redirects to dashboard or verification screen

**handleResendVerification()**
- Requires email and password
- Calls `/api/auth/resend-verification`
- Shows success/error message

**handleCheckVerification()**
- Calls `/api/auth/check-verification`
- If verified, redirects to login
- If not verified, shows message

**handleLogout()**
- Clears AsyncStorage
- Resets all state
- Shows login screen

---

#### Report Functions

**handleGenerateReport()**
- Validates required fields
- Calls `/api/reports/generate`
- Shows loading state
- Displays report in modal
- Updates usage stats

**fetchReports()**
- Calls `/api/reports`
- Loads user's reports
- Displays in My Reports screen

**handleDownloadReport(format)**
- Calls `/api/reports/:reportId/export`
- Downloads file using FileSystem
- Shares file using Sharing API

**pickImage()**
- Opens photo library
- Allows multiple selection
- Adds to photos array

**takePhoto()**
- Opens camera
- Captures photo
- Adds to photos array

---

#### Utility Functions

**fetchUsageStats()**
- Calls `/api/usage/stats`
- Updates usage statistics
- Displays in dashboard

**updateFormField(field, value)**
- Updates form data
- Used for controlled inputs

**resetGenerateForm()**
- Clears all form fields
- Resets to default values
- Clears photos

**formatTierName(tier)**
- Converts tier string to display name
- starter → Starter
- professional → Pro
- agency → Agency
- enterprise → Enterprise

---

### Mobile App Styling

#### Color Theme

**Light Mode:**
```javascript
const COLORS_LIGHT = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  background: '#f9fafb',
  cardBackground: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#e5e7eb',
};
```

**Dark Mode:**
```javascript
const COLORS_DARK = {
  primary: '#818cf8',
  secondary: '#9333ea',
  success: '#34d399',
  error: '#f87171',
  warning: '#fbbf24',
  info: '#60a5fa',
  background: '#111827',
  cardBackground: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  textMuted: '#9ca3af',
  border: '#374151',
};
```

---

### Web Dashboard

**Location:** `frontend/` directory

**Technologies:**
- React 18
- Vite
- TailwindCSS
- Firebase SDK v10
- React Router
- React Markdown

**Pages:**
1. Login
2. Signup
3. Dashboard
4. Generate Report
5. My Reports
6. Profile
7. Subscription/Pricing

**Key Differences from Mobile:**
- Uses Firebase SDK v10 directly (not via backend)
- Client-side authentication
- Real-time Firestore updates
- Responsive design for desktop/tablet

---

## API Reference

### Base URL

```
Production: https://flacronai.onrender.com/api
Development: http://localhost:3000/api
```

### Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <jwt-token>
```

### Response Format

**Success:**
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token/credentials)
- `403` - Forbidden (email not verified, usage limit)
- `404` - Not Found
- `500` - Internal Server Error

### Rate Limiting

**Currently:** No rate limiting (⚠️ SECURITY RISK)

**Recommended:**
- General API: 100 requests/15 minutes
- Report Generation: 10 requests/hour
- Login: 5 attempts/15 minutes

---

## Database Schema

### Firebase Firestore Collections

#### 1. `users` Collection

**Document ID:** Firebase UID

**Schema:**
```javascript
{
  userId: "firebase-user-id",          // String
  email: "user@example.com",           // String
  displayName: "John Doe",             // String
  tier: "starter",                     // String: starter|professional|agency|enterprise
  reportsGenerated: 0,                 // Number
  currentPeriod: "2024-12",            // String: YYYY-MM
  periodUsage: 0,                      // Number
  createdAt: "2024-12-07T10:00:00Z",  // ISO String
  updatedAt: "2024-12-07T10:00:00Z"   // ISO String
}
```

**Indexes:**
- None (default)

---

#### 2. `reports` Collection

**Document ID:** Auto-generated

**Schema:**
```javascript
{
  reportId: "auto-generated-id",       // String
  userId: "firebase-user-id",          // String
  claimNumber: "CLM-2024-12345",       // String
  content: "# REPORT CONTENT...",      // String (Markdown)
  createdAt: "2024-12-07T10:00:00Z",  // ISO String
  metadata: {                          // Object
    insuredName: "John Doe",           // String
    lossDate: "2024-12-01",            // String
    lossType: "Fire",                  // String
    reportType: "Preliminary",         // String
    propertyAddress: "123 Main St",    // String
    propertyDetails: "2-story home",   // String
    lossDescription: "Fire damage",    // String
    damages: "Structural damage",      // String
    recommendations: "Renovation"      // String
  }
}
```

**Indexes:**
- `userId` (ascending)
- `createdAt` (descending)
- Composite: `userId` + `createdAt` (for efficient user report queries)

---

#### 3. `subscriptions` Collection

**Document ID:** Firebase UID

**Schema:**
```javascript
{
  userId: "firebase-user-id",          // String
  stripeCustomerId: "cus_xxx",         // String
  stripeSubscriptionId: "sub_xxx",     // String
  tier: "professional",                // String
  status: "active",                    // String: active|canceled|past_due
  currentPeriodEnd: 1704672000,        // Unix timestamp
  createdAt: "2024-12-07T10:00:00Z",  // ISO String
  updatedAt: "2024-12-07T10:00:00Z"   // ISO String
}
```

**Note:** Currently partially implemented

---

### Firebase Authentication

**User Properties:**
```javascript
{
  uid: "firebase-user-id",
  email: "user@example.com",
  displayName: "John Doe",
  emailVerified: true,
  metadata: {
    creationTime: "2024-12-07T10:00:00.000Z",
    lastSignInTime: "2024-12-07T11:00:00.000Z"
  }
}
```

**Password Hashing:** Automatic (bcrypt) by Firebase

---

## Authentication Flow

### Registration Flow

```
1. User enters email, password, displayName
   ↓
2. Mobile app calls POST /api/auth/register
   ↓
3. Backend creates Firebase Auth user (emailVerified: false)
   ↓
4. Backend creates Firestore user document
   ↓
5. Backend gets Firebase idToken by signing in user
   ↓
6. Backend calls Firebase REST API: sendOobCode (VERIFY_EMAIL)
   ↓
7. Firebase sends verification email automatically
   ↓
8. User receives email with verification link
   ↓
9. User clicks link → Firebase verifies email
   ↓
10. User can now login
```

### Login Flow

```
1. User enters email, password
   ↓
2. Mobile app calls POST /api/auth/login
   ↓
3. Backend verifies password using Firebase REST API
   ↓
4. Backend checks if email is verified
   ↓
   If NOT verified:
   - Return error with emailVerified: false
   - Mobile app shows verification screen
   ↓
   If verified:
   - Get user data from Firestore
   - Create JWT token (30 day expiry)
   - Return token + user data
   ↓
5. Mobile app saves token to AsyncStorage
   ↓
6. Mobile app sets user state (logged in)
   ↓
7. User sees dashboard
```

### Email Verification Flow

```
User signs up → Verification screen shown
   ↓
User option 1: Click link in email
   - Firebase verifies email automatically
   - User clicks "I've Verified - Continue"
   - App checks verification status
   - If verified, redirect to login
   ↓
User option 2: Didn't receive email
   - Click "Resend Verification Email"
   - Requires password (for idToken)
   - Backend signs in user
   - Backend calls sendOobCode
   - Firebase sends new email
```

### Session Management

**Mobile App:**
- Token stored in AsyncStorage
- Token expires after 30 days
- Auto-login on app restart if token valid
- Logout clears AsyncStorage

**Web Dashboard:**
- Uses Firebase SDK v10
- Session persists in browser
- Logout calls Firebase signOut()

---

## Security

### Current Security Measures

✅ **HTTPS Only** - Render.com enforces HTTPS
✅ **Firebase Auth** - Industry-standard authentication
✅ **JWT Tokens** - Secure token-based auth for mobile
✅ **Email Verification** - Required before login
✅ **Password Hashing** - Firebase handles bcrypt automatically
✅ **Helmet.js** - HTTP security headers
✅ **CORS** - Cross-origin resource sharing configured
✅ **Input Validation** - Basic validation on required fields

### Security Vulnerabilities (CRITICAL)

🔴 **HIGH RISK:**
1. **JWT_SECRET in code** - Default secret exposed
2. **No rate limiting** - Vulnerable to brute force, spam
3. **No file upload validation** - Could upload malicious files
4. **Email verification bypass parameter** - Can skip verification
5. **Missing Firestore Security Rules** - Database potentially open

🟡 **MEDIUM RISK:**
6. **Temporary password storage** - Kept in memory for resend
7. **No CSRF protection** - Web dashboard vulnerable
8. **No input sanitization** - Potential XSS risk
9. **Weak error messages** - Could leak information

🟢 **LOW RISK:**
10. **API key in frontend** - Acceptable for Firebase (protected by rules)
11. **Console logs in production** - Could leak sensitive data
12. **No request logging** - Hard to track attacks

### Recommended Security Improvements

#### 1. Environment Variables

**NEVER commit these to Git:**
```bash
JWT_SECRET=<64-char-random-string>
GEMINI_API_KEY=<your-key>
STRIPE_SECRET_KEY=<your-key>
FIREBASE_PRIVATE_KEY=<your-key>
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

#### 2. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Reports - users can only access their own
    match /reports/{reportId} {
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      allow update, delete: if request.auth != null
                            && resource.data.userId == request.auth.uid;
    }

    // Subscriptions - read only own
    match /subscriptions/{userId} {
      allow read: if request.auth != null
                  && request.auth.uid == userId;
      allow write: if false; // Only backend can write
    }
  }
}
```

---

#### 3. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// API-wide rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP'
});

// Report generation limit
const reportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Report generation limit reached'
});

// Login rate limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/', apiLimiter);
app.use('/api/reports/generate', reportLimiter);
app.use('/api/auth/login', loginLimiter);
```

---

#### 4. File Upload Validation

```javascript
const validateUpload = (file) => {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  if (file.size > MAX_SIZE) {
    throw new Error('File too large. Max 10MB');
  }

  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPG/PNG');
  }

  return true;
};
```

---

#### 5. Input Sanitization

```javascript
const sanitize = require('mongo-sanitize');

const sanitizeInput = (data) => {
  return sanitize(data); // Prevents NoSQL injection
};

// Use in routes
const { email, password } = sanitize(req.body);
```

---

## Deployment

### Backend Deployment (Render.com)

**Service:** Web Service
**Repository:** Connected to GitHub
**Branch:** main
**Build Command:** `npm install`
**Start Command:** `npm start`
**Environment:** Node 18

**Environment Variables (Set in Render Dashboard):**
```
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_API_KEY
GEMINI_API_KEY
JWT_SECRET
STRIPE_SECRET_KEY
NODE_ENV=production
```

**Auto-Deploy:** Enabled on push to main branch

**Health Check:** `/` endpoint returns "FlacronAI API is running"

**Logs:** Available in Render dashboard

---

### Frontend Deployment (Web Dashboard)

**Current:** Not deployed (local only)

**Recommended: Render.com Static Site**

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Publish Directory:** `frontend/dist`

**Environment Variables:**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_API_URL
```

---

### Mobile App Deployment

#### iOS (App Store)

**Requirements:**
- Apple Developer Account ($99/year)
- macOS with Xcode
- App Store Connect account

**Build Process:**
```bash
cd MobileApp
npx expo prebuild --platform ios
npx expo build:ios
```

**Submission:**
- Upload to App Store Connect
- Fill app information
- Submit for review
- Approval takes 1-7 days

---

#### Android (Google Play Store)

**Requirements:**
- Google Play Developer Account ($25 one-time)
- Android Studio (optional)

**Build Process:**
```bash
cd MobileApp
npx expo prebuild --platform android
npx eas build --platform android --profile production
```

**Submission:**
- Upload APK/AAB to Google Play Console
- Fill app information
- Submit for review
- Approval takes 1-3 days

---

## File Structure

### Complete Project Structure

```
FlacronCV/
├── backend/
│   ├── config/
│   │   └── firebase.js                    # Firebase Admin SDK init
│   ├── middleware/
│   │   └── auth.js                        # JWT auth middleware
│   ├── routes/
│   │   ├── auth.js                        # Authentication endpoints
│   │   ├── reports.js                     # Report generation
│   │   ├── usage.js                       # Usage tracking
│   │   └── stripe.js                      # Payment processing
│   ├── uploads/                           # Temporary file storage
│   ├── server.js                          # Main server file
│   ├── package.json                       # Backend dependencies
│   └── .env                               # Environment variables
│
├── frontend/                              # React web dashboard
│   ├── src/
│   │   ├── components/                    # React components
│   │   ├── pages/                         # Page components
│   │   ├── firebase.js                    # Firebase client config
│   │   ├── App.jsx                        # Main app component
│   │   └── main.jsx                       # Entry point
│   ├── public/                            # Static assets
│   ├── index.html                         # HTML template
│   ├── package.json                       # Frontend dependencies
│   └── vite.config.js                     # Vite configuration
│
├── MobileApp/                             # React Native app
│   ├── App.js                             # Main app file (2660 lines)
│   ├── app.json                           # Expo configuration
│   ├── package.json                       # Mobile dependencies
│   ├── assets/                            # Images, icons
│   │   ├── icon.png                       # App icon
│   │   ├── splash.png                     # Splash screen
│   │   ├── android/                       # Android assets
│   │   └── ios/                           # iOS assets
│   └── android/                           # Android build output
│
├── TECHNICAL_DOCUMENTATION.md             # This file
├── README.md                              # Project overview
└── .gitignore                             # Git ignore rules
```

---

## API Endpoints Summary

### Authentication (`/api/auth`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/register` | Create new user | No |
| POST | `/login` | User login | No |
| POST | `/resend-verification` | Resend email verification | No |
| POST | `/check-verification` | Check email verification | No |
| GET | `/me` | Get current user | Yes |
| POST | `/sync-user` | Sync user data | Yes |
| POST | `/verify` | Verify ID token | No |
| POST | `/logout` | Revoke refresh tokens | Yes |

### Reports (`/api/reports`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/generate` | Generate AI report | Yes |
| GET | `/` | Get user's reports | Yes |
| POST | `/:reportId/export` | Export as PDF/DOCX | Yes |

### Usage (`/api/usage`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/stats` | Get usage statistics | Yes |

### Stripe (`/api/stripe`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/create-checkout-session` | Create checkout | Yes |
| POST | `/webhook` | Handle Stripe events | No |

---

## Key Technologies Deep Dive

### Google Gemini API Integration

**Model Used:** `gemini-1.5-flash`

**Configuration:**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent(prompt);
const response = result.response.text();
```

**Cost:** Free tier: 15 requests/minute, 1M tokens/day

**Prompt Engineering:**
- Structured prompt with clear sections
- Markdown output format
- Professional tone
- Industry-specific terminology

---

### Firebase Admin SDK

**Initialization:**
```javascript
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

const db = admin.firestore();
const auth = admin.auth();
```

**Key Features Used:**
- User creation: `auth().createUser()`
- Email verification: `auth().generateEmailVerificationLink()`
- User lookup: `auth().getUserByEmail()`
- Firestore CRUD: `db.collection().doc().set()`

---

### JWT Token Implementation

**Token Creation:**
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  {
    userId: userRecord.uid,
    email: userRecord.email
  },
  JWT_SECRET,
  { expiresIn: '30d' }
);
```

**Token Verification:**
```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
```

---

## Common Issues & Solutions

### Issue 1: Email Verification Not Received

**Cause:** Firebase might not send emails in certain regions or spam filters

**Solutions:**
1. Check spam/junk folder
2. Verify Firebase email template is enabled
3. Add sender to safe contacts
4. Use "Resend Verification Email" button

---

### Issue 2: Reports Disappearing After Deploy

**Cause:** Render.com has ephemeral file system

**Solution:** Migrate to Firebase Storage (CRITICAL)

```javascript
// Future implementation needed
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('flacronai.appspot.com');

// Upload file
await bucket.upload(filePath, {
  destination: `reports/${reportId}/report.pdf`
});
```

---

### Issue 3: Mobile App Won't Login

**Checklist:**
1. Check API_URL in App.js (should be Render URL)
2. Verify backend is running on Render
3. Check network connectivity
4. Clear AsyncStorage
5. Reinstall app

---

### Issue 4: Gemini API Quota Exceeded

**Free Tier Limits:**
- 15 requests/minute
- 1M tokens/day

**Solutions:**
1. Implement request queuing
2. Add rate limiting
3. Upgrade to paid tier
4. Cache similar reports

---

## Future Improvements Needed

### Critical (Data Loss Prevention)
1. ✅ Firebase Storage migration
2. ✅ Automated backups
3. ✅ Error monitoring (Sentry)

### Security
4. ✅ Rate limiting
5. ✅ Firestore Security Rules
6. ✅ Input sanitization
7. ✅ File upload validation

### Features
8. Password reset
9. Profile management
10. Report search/filter
11. Report sharing
12. Admin dashboard
13. Email notifications

### UX Improvements
14. Loading states
15. Error messages
16. Offline mode
17. App onboarding
18. Tutorial/help section

### Performance
19. Report caching
20. Image optimization
21. Lazy loading
22. Code splitting

---

## Development Workflow

### Local Development

**Backend:**
```bash
cd backend
npm install
# Create .env file with credentials
npm run dev
# Server runs on http://localhost:3000
```

**Frontend (Web):**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

**Mobile App:**
```bash
cd MobileApp
npm install
npx expo start
# Scan QR code with Expo Go app
```

---

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge to main
# Render auto-deploys backend
```

---

### Testing

**Currently:** No automated tests (⚠️ Should add)

**Recommended:**
```bash
# Backend tests
npm install --save-dev jest supertest
npm test

# Mobile tests
npm install --save-dev @testing-library/react-native
npm test
```

---

## Support & Maintenance

### Monitoring

**Backend Health:**
- Render dashboard: https://dashboard.render.com
- Logs: Available in Render
- Uptime: Monitor via UptimeRobot (recommended)

**Database:**
- Firebase Console: https://console.firebase.google.com
- Firestore usage
- Authentication stats

**API Usage:**
- Gemini API quota
- Stripe dashboard
- User metrics

---

### Logs

**Backend Logs:**
```bash
# View on Render
# Or download logs file
```

**Mobile App Logs:**
```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android
```

---

## License & Credits

**License:** ISC

**Author:** Flacron Enterprises

**Technologies:**
- Node.js & Express
- React & React Native
- Firebase (Google)
- Google Gemini AI
- Stripe
- Expo
- Render.com

---

## Contact & Support

**Repository:** https://github.com/devkashaniqbal/FlacronAI

**Issues:** Report via GitHub Issues

**Documentation Version:** 1.0.0

**Last Updated:** December 7, 2024

---

## Appendix

### Glossary

- **API** - Application Programming Interface
- **JWT** - JSON Web Token
- **REST** - Representational State Transfer
- **CRUD** - Create, Read, Update, Delete
- **SDK** - Software Development Kit
- **PDF** - Portable Document Format
- **DOCX** - Microsoft Word Document
- **AI** - Artificial Intelligence
- **Firebase** - Google's Backend-as-a-Service platform
- **Firestore** - Firebase's NoSQL database
- **Gemini** - Google's AI model

---

### References

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Gemini API](https://ai.google.dev)
- [Express.js Guide](https://expressjs.com)
- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Stripe API Reference](https://stripe.com/docs/api)

---

## Document End

This technical documentation provides a comprehensive overview of the FlacronAI application architecture, codebase, and deployment. For questions or contributions, please refer to the GitHub repository.

**Generated with:** Claude Code
**Co-Authored-By:** Claude Sonnet 4.5 <noreply@anthropic.com>
