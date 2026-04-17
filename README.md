# Hospital OPD Management System 🏥

A comprehensive Hospital Outpatient Department (OPD) Management System built with Node.js, Express, MongoDB, and Socket.io. This system provides a complete solution for managing hospital appointments, doctor-patient interactions, staff management, and administrative functions.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [System Architecture](#-system-architecture)
4. [Project Structure](#-project-structure)
5. [Prerequisites](#-prerequisites)
6. [Installation & Setup](#-installation--setup)
7. [Environment Variables](#-environment-variables)
8. [Running the Application](#-running-the-application)
9. [User Roles & Access](#-user-roles--access)
10. [Code Structure Explained](#-code-structure-explained)
    - [Server Configuration](#1-server-configuration-serverjs)
    - [Database Layer](#2-database-layer-db)
    - [Models](#3-models-models)
    - [Controllers](#4-controllers-controller)
    - [Routes](#5-routes-routes)
    - [Middleware](#6-middleware-middleware)
    - [Services](#7-services-services)
    - [Templates](#8-templates-template)
    - [Public Assets](#9-public-assets-public)
11. [API Endpoints](#-api-endpoints)
12. [Real-time Features](#-real-time-features)
13. [Security Features](#-security-features)
14. [Contributing](#-contributing)
15. [License](#-license)

---

## ✨ Features

### For Patients
- 👤 **User Registration & Authentication** with OTP verification
- 📅 **Book Appointments** with available doctors
- 📊 **View Appointment Status** and queue position
- 📝 **Medical Records** access
- ⭐ **Doctor Reviews** and ratings
- 🔔 **Real-time Notifications** for appointment updates
- 📱 **Profile Management** with image upload

### For Doctors
- 👨‍⚕️ **Doctor Dashboard** with appointment overview
- 📋 **Manage Appointments** (accept, decline, complete)
- 👥 **Staff Management** system
- 📊 **Patient Records** management
- 🔔 **Real-time Appointment Notifications**
- ⏰ **Availability Management**
- 💬 **Patient Reviews** viewing

### For Admins
- 🏥 **Super Admin Dashboard**
- 👨‍⚕️ **Doctor Management** (Add, Edit, Delete)
- 📊 **Patient Management**
- 📅 **Appointment Oversight**
- 🔔 **System-wide Notifications**
- ⚙️ **System Settings**

### Technical Features
- ⚡ **Cluster Mode** for high availability
- 🔌 **Socket.io** for real-time updates
- 🔐 **JWT Authentication**
- 📧 **Email Notifications** (OTP, Password Reset)
- 📄 **PDF Generation** for appointments
- 🖼️ **Image Upload** with Multer
- 🔒 **Password Encryption** with bcrypt
- 🚀 **RESTful API** architecture

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v4.21.2
- **Database**: MongoDB v8.9.2 (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Real-time**: Socket.io v4.8.1
- **Password Hashing**: bcrypt v5.1.1
- **File Upload**: Multer v1.4.5
- **Email**: Nodemailer v6.9.16
- **PDF Generation**: pdf-lib v1.17.1

### Frontend
- **Template Engine**: EJS v3.1.10
- **Styling**: Custom CSS
- **JavaScript**: Vanilla JS for DOM manipulation

### Additional Tools
- **Session Management**: express-session v1.18.1
- **Flash Messages**: connect-flash v0.1.1
- **CORS**: cors v2.8.5
- **Environment Variables**: dotenv v16.4.7
- **Process Management**: Nodemon v3.1.9 (dev)

---

## 🏗️ System Architecture

The application follows a **MVC (Model-View-Controller)** architecture with additional layers:

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  (Browser - EJS Templates, CSS, JavaScript)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                       ROUTING LAYER                          │
│  (Express Routes - API Endpoints & Page Routes)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     MIDDLEWARE LAYER                         │
│  (Authentication, Authorization, Session Management)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                          │
│  (Business Logic, Request Handling)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                           │
│  (JWT Services, Email Services)                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                       MODEL LAYER                            │
│  (Mongoose Schemas & Models)                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│  (MongoDB)                                                   │
└─────────────────────────────────────────────────────────────┘

        REAL-TIME COMMUNICATION (Socket.io)
        ═════════════════════════════════════
        New Appointments → Doctor Dashboard
        Status Updates → Patient Dashboard
```

---

## 📁 Project Structure

```
Hospital-opd-system/
│
├── controller/                 # Business logic controllers
│   ├── admin/                 # Admin-specific controllers
│   │   ├── adminController.js # Admin dashboard & CRUD operations
│   │   └── authController.js  # Admin authentication
│   ├── addStaff.js           # Staff management controller
│   ├── appointment.js         # Appointment handling
│   ├── credential.js          # User authentication & credentials
│   ├── doctor.js              # Doctor operations
│   ├── mainPage.js            # Main page controller
│   ├── profileImage.js        # Profile image upload
│   ├── review.js              # Doctor reviews
│   └── UserRoutes.js          # User route handlers
│
├── db/                        # Database configuration
│   ├── mongoose.js            # MongoDB connection setup
│   └── picture.js             # Image storage configuration
│
├── middleware/                # Express middleware
│   └── auth.js                # Authentication & authorization middleware
│
├── models/                    # Mongoose schemas & models
│   ├── signupSchema.js        # Patient/User schema
│   ├── doctorSchema.js        # Doctor schema
│   ├── appintmentSchema.js    # Appointment schema
│   ├── addStaff.js            # Staff schema
│   ├── review.js              # Review schema
│   ├── profileImageSchema.js  # Profile image schema
│   ├── notificationSchema.js  # Notification schema
│   └── AppointmentSlot.js     # Appointment slot schema
│
├── routes/                    # Express route definitions
│   ├── routes.js              # Main API routes (POST, PUT, DELETE)
│   ├── staticRoutes.js        # Protected page routes
│   ├── routeWithNoAuth.js     # Public routes
│   ├── mainPage.js            # Public-facing routes
│   ├── admin.js               # Admin routes
│   ├── doctorRoutes.js        # Doctor-specific routes
│   ├── appointments.js        # Appointment routes
│   ├── doctorLogin.js         # Doctor login routes
│   ├── staffRoutes.js         # Staff routes
│   └── updateInfo.js          # Update information routes
│
├── services/                  # Service layer
│   └── auth.js                # JWT token generation & verification
│
├── socket/                    # Socket.io configuration
│   └── socket.js              # Real-time communication setup
│
├── template/                  # EJS view templates
│   ├── admin/                 # Admin dashboard views
│   ├── doctor-dashboard/      # Doctor dashboard views
│   ├── user-dashboard/        # Patient dashboard views
│   ├── staff-dashboard/       # Staff dashboard views
│   ├── main-page/            # Public pages
│   ├── partials/             # Reusable components
│   ├── login.ejs             # Login page
│   ├── signup.ejs            # Signup page
│   └── otp_verification.ejs  # OTP verification page
│
├── public/                    # Static assets
│   ├── doctors/              # Doctor-specific assets
│   ├── main page/            # Main page assets
│   │   └── asset/            # Images & icons
│   ├── page/                 # Page-specific styles
│   ├── super-admin/          # Admin panel assets
│   ├── uploads/              # User-uploaded files
│   ├── login.css             # Login page styles
│   ├── signup.css            # Signup page styles
│   └── script.js             # Client-side JavaScript
│
├── server.js                  # Main application entry point
├── package.json               # Project dependencies
├── package-lock.json          # Locked dependencies
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.x or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use MongoDB Atlas (cloud database)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** (comes with Node.js)
- A **Gmail account** (for sending OTP emails)

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/hospital-opd-system.git
cd hospital-opd-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo service mongod start
   ```
3. Your local MongoDB URI will be: `mongodb://localhost:27017/hospital_opd`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/hospital_opd`)

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following configuration (see [Environment Variables](#-environment-variables) section for details):

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/hospital_opd
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_opd

# JWT Secret (generate a strong random string)
JWT_Secret=your_super_secret_jwt_key_here

# Email Configuration (Gmail)
EMAIL=your-email@gmail.com
PASSWD=your_gmail_app_password

# Admin Credentials
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=admin123

# ImageKit (optional - for advanced image handling)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Step 5: Set Up Gmail App Password

For email functionality (OTP, password reset):

1. Go to your Google Account settings
2. Enable **2-Factor Authentication**
3. Go to **Security** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `.env` as `PASSWD`

---

## 🔐 Environment Variables

Detailed explanation of each environment variable:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port number for the server | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/hospital_opd` |
| `JWT_Secret` | Secret key for JWT token generation | `my_very_secure_secret_key_12345` |
| `EMAIL` | Gmail address for sending emails | `hospital@gmail.com` |
| `PASSWD` | Gmail app password (not regular password) | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | Super admin login email | `admin@hospital.com` |
| `ADMIN_PASSWORD` | Super admin password | `secureAdminPass123` |

**Security Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

---

## ▶️ Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Production Mode

```bash
npm start
```

This runs the server with Node.js clustering for better performance.

### Access the Application

Once the server is running, open your browser and navigate to:

- **Main Website**: `http://localhost:3000/`
- **Patient Login**: `http://localhost:3000/login/patient`
- **Doctor Login**: `http://localhost:3000/login/doctor`
- **Admin Panel**: `http://localhost:3000/admin/login`

---

## 👥 User Roles & Access

### 1. **Patient**
- **Registration**: `/signup`
- **Login**: `/login/patient`
- **Dashboard**: `/api/patient`
- **Capabilities**:
  - Register with OTP verification
  - Book appointments with doctors
  - View appointment status and queue
  - Access medical records
  - Upload profile picture
  - Leave reviews for doctors

### 2. **Doctor**
- **Login**: `/login/doctor` (Doctors are added by admin)
- **Dashboard**: `/api/staff`
- **Capabilities**:
  - View all appointments
  - Accept/decline/complete appointments
  - Access patient records
  - Manage staff members
  - Update availability schedule
  - View patient reviews

### 3. **Staff** (Doctor's assistants)
- **Added by**: Doctor through dashboard
- **Capabilities**:
  - Limited access to doctor's dashboard
  - View appointments
  - Assist with patient records

### 4. **Admin**
- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Capabilities**:
  - Add, edit, delete doctors
  - View all patients
  - Manage all appointments
  - Send system notifications
  - Configure system settings

---

## 📚 Code Structure Explained

### 1. Server Configuration (`server.js`)

**Purpose**: Main entry point of the application.

**Key Features**:
- **Cluster Mode**: Utilizes all CPU cores for better performance
- **Express Setup**: Configures middleware, routes, and template engine
- **Socket.io**: Sets up real-time communication
- **Session Management**: Handles user sessions and flash messages
- **Error Handling**: Graceful error handling for port conflicts

**Code Flow**:
```javascript
1. Load environment variables (dotenv)
2. Check if primary process → fork workers for each CPU core
3. If worker process:
   - Initialize Express app
   - Connect to MongoDB
   - Set up middleware (session, flash, body-parser, cookie-parser)
   - Configure Socket.io
   - Register routes
   - Set EJS as template engine
   - Start server with port conflict handling
```

**Key Middleware**:
- `express.json()`: Parses JSON request bodies
- `express.urlencoded()`: Parses URL-encoded data
- `express-session`: Manages user sessions
- `connect-flash`: Displays temporary messages
- `cookie-parser`: Parses cookies for authentication

---

### 2. Database Layer (`db/`)

#### `mongoose.js`
**Purpose**: Establishes connection to MongoDB database.

**Features**:
- Connection timeout handling (30 seconds)
- Error logging
- Connection success confirmation

**Usage**:
```javascript
const connectDB = require('./db/mongoose');
connectDB(); // Called in server.js
```

---

### 3. Models (`models/`)

Mongoose schemas define the structure of data stored in MongoDB.

#### `signupSchema.js` - User/Patient Model
**Fields**:
- `firstName`, `lastName`: Patient name
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `phoneNumber`: Unique phone number
- `age`, `address`, `category`: Patient details
- `userType`: Role (`patient`, `staff`)
- `otp`, `otpExpires`: OTP verification
- `isVerified`: Account verification status

#### `doctorSchema.js` - Doctor Model
**Nested Structure**:
```javascript
{
  userType: "doctor",
  firstName, lastName, title, specialty,
  status: Boolean, // Active/Inactive
  contactInfo: { email, phoneNumber, address },
  qualifications: { medicalSchool, degree, licensureNumber, certification },
  workInfo: { hospital, department, experience },
  availability: { days, startTime, endTime },
  authentication_Information: { userName, password }
}
```

**Special Features**:
- Pre-save hook to hash password before saving
- Timestamps (createdAt, updatedAt)
- Status index for faster queries

#### `appintmentSchema.js` - Appointment Model
**Fields**:
- Patient details: `fullname`, `mobile`, `age`, `gender`, `address`
- `reason`: Purpose of visit
- `drName`: Doctor's full name
- `date`: Appointment date
- `status`: Enum (`new`, `accepted`, `declined`, `waitlisted`, `completed`)
- `createdBy`: Reference to patient
- `doctor`: Reference to doctor

#### `addStaff.js` - Staff Model
**Purpose**: Links patients to doctors as staff members.

**Fields**:
- `mobileNumber`: Staff contact
- `UserId`: Reference to user
- `doctorId`: Reference to doctor
- `status`: `active` or `inactive`

#### `review.js` - Review Model
**Purpose**: Patient reviews for doctors.

**Fields**:
- `content`: Review text
- `doctorId`: Doctor being reviewed
- `createdBy`: Patient who wrote review

#### `notificationSchema.js` - Notification Model
**Fields**:
- `title`, `message`: Notification content
- `target`: Recipient group (`all`, `doctors`, `patients`)

---

### 4. Controllers (`controller/`)

Controllers contain business logic and handle requests.

#### `credential.js` - Authentication Controller

**Key Functions**:

1. **`handleSignup(req, res)`**
   - Validates user input
   - Hashes password with bcrypt
   - Generates 6-digit OTP
   - Sends OTP via email
   - Creates user record

2. **`verifyOtp(req, res)`**
   - Verifies OTP against hashed stored OTP
   - Checks expiration (10 minutes)
   - Marks user as verified

3. **`handleLogin(req, res)`**
   - Validates credentials
   - Compares password with bcrypt
   - Generates JWT token
   - Sets token in HTTP-only cookie
   - Redirects based on user type

4. **`doctorLogin(req, res)`**
   - Similar to handleLogin but for doctors
   - Uses nested contactInfo.phoneNumber

5. **`updateUserInfo(req, res)`**
   - Updates user profile
   - Uses JWT to identify user

6. **`changePassword(req, res)`**
   - Verifies current password
   - Validates new password confirmation
   - Hashes and saves new password

7. **`forget_pw(req, res)`**
   - Sends password reset link via email

#### `appointment.js` - Appointment Controller

**Key Functions**:

1. **`setAppointment(req, res)`**
   - Validates user authentication
   - Checks for duplicate appointments
   - Creates new appointment
   - Emits Socket.io event for real-time update
   - Notifies doctor dashboard instantly

2. **`updateAppointmentStatus(req, res)`**
   - Updates appointment status
   - Moves completed appointments to records
   - Returns success/error response

#### `doctor.js` - Doctor Operations
- Add new doctors
- Update doctor information
- Manage doctor availability

#### `addStaff.js` - Staff Management
- **`addStaff(req, res)`**: Links patient to doctor as staff
- **`removeStaff(req, res)`**: Removes staff, reverts to patient

#### `admin/adminController.js` - Admin Functions
- **`getDashboard()`**: Fetches dashboard statistics
- **`getAppointments()`**: Lists all appointments
- **`getDoctors()`**: Lists all doctors
- **`getPatients()`**: Lists all patients
- **`addDoctor()`**: Creates new doctor
- **`editDoctor()`**: Updates doctor details
- **`deleteDoctor()`**: Removes doctor
- **`sendNotification()`**: Broadcasts notifications

---

### 5. Routes (`routes/`)

Routes define API endpoints and page navigation.

#### `routes.js` - Main API Routes

**Authentication Routes**:
```javascript
POST /signup              → Register new patient
POST /verify-otp          → Verify OTP
POST /login/patient       → Patient login
POST /login/doctor        → Doctor login
POST /logout              → Logout (clear cookie)
POST /forget-password     → Request password reset
```

**Appointment Routes** (requires authentication):
```javascript
POST /appointment-booking                    → Book appointment
POST /appointments/:id/updateStatus          → Update appointment status
DELETE /appointment/delete/:id               → Cancel appointment
```

**Staff Management** (requires doctor authentication):
```javascript
POST /add-staff                              → Add staff member
POST /update-staff-status                    → Toggle staff status
GET /staff-details/:id                       → View staff details
POST /remove-staff/:id                       → Remove staff
```

**Profile Routes** (requires authentication):
```javascript
POST /profile-picture                        → Upload profile picture
PUT /patiet/change-password                  → Change password
PUT /patiet/Update-user-information          → Update profile
```

#### `staticRoutes.js` - Protected Page Routes

**Patient Dashboard Routes** (requires patient authentication):
```javascript
GET /api/patient                → Patient dashboard
GET /api/appointment-booking    → Book appointment page
GET /api/Queue-Status          → View appointment queue
GET /api/Medical-Records       → View medical records
GET /api/profile-picture       → Upload profile picture page
GET /api/Settings              → Settings page
```

**Doctor Dashboard Routes** (requires doctor authentication):
```javascript
GET /api/staff                        → Doctor dashboard
GET /api/New-Appointments            → New appointment requests
GET /api/patient-record              → Patient records
GET /api/patient-appointment-details/:id  → Appointment details
GET /api/doctor/add-staff            → Staff management page
```

#### `mainPage.js` - Public Routes

```javascript
GET /nearest-doctors              → List all doctors
GET /doctor-details/:id          → Doctor profile with reviews
GET /specialty/:specialty        → Doctors by specialty
POST /reviews/:doctorId          → Submit doctor review
```

#### `admin.js` - Admin Routes

```javascript
GET /admin/login                 → Admin login page
POST /admin/login                → Admin authentication
GET /admin/dashboard             → Admin dashboard
GET /admin/doctors               → Manage doctors
GET /admin/patients              → View patients
GET /admin/appointments          → View appointments
GET /admin/notifications         → Send notifications
GET /admin/settings              → System settings
```

#### `routeWithNoAuth.js` - Public Pages

```javascript
GET /                           → Home page
GET /signup                     → Signup page
GET /login/patient              → Patient login page
GET /login/doctor               → Doctor login page
GET /otp-varification           → OTP verification page
GET /forget-patient-password    → Password reset page
```

---

### 6. Middleware (`middleware/`)

#### `auth.js` - Authentication & Authorization

**Functions**:

1. **`checkForAuthentication(req, res, next)`**
   - Extracts JWT token from cookies
   - Verifies token validity
   - Attaches user to `req.user`
   - Redirects to login if invalid

2. **`doctorAuthentication(req, res, next)`**
   - Similar to above but for doctors
   - Attaches doctor to `req.doctor`
   - Optional (doesn't redirect if no token)

3. **`restrictTo(roles = [])`**
   - Role-based access control
   - Checks if user's role is in allowed roles
   - Example: `restrictTo(['patient', 'admin'])`

4. **`requireAdminAuth(req, res, next)`**
   - Checks session-based admin authentication
   - Redirects to admin login if not authenticated

**Usage Example**:
```javascript
router.get('/patient', 
  checkForAuthentication,           // Step 1: Verify JWT
  restrictTo(['patient']),          // Step 2: Check role
  (req, res) => {
    // Only authenticated patients reach here
    res.render('dashboard', { user: req.user });
  }
);
```

---

### 7. Services (`services/`)

#### `auth.js` - JWT Service

**Functions**:

1. **`setuser(user)`**
   - Creates JWT token from user data
   - Includes: `_id`, `email`, `firstName`, `lastName`, `userType`, etc.
   - No expiration (consider adding for security)
   - Returns signed token

2. **`getuser(token)`**
   - Verifies and decodes JWT token
   - Returns user object or null
   - Handles errors gracefully

3. **`setdoctor(doctor)`**
   - Creates JWT token for doctor
   - Includes all relevant doctor fields
   - Expires in 2 hours
   - Returns signed token

**Usage**:
```javascript
// In login controller
const token = setuser(user);
res.cookie("token", token, { httpOnly: true });

// In middleware
const user = getuser(token);
req.user = user;
```

---

### 8. Templates (`template/`)

EJS templates for rendering HTML views.

#### Structure:

1. **`partials/`** - Reusable components
   - `header.ejs`: Navigation bar
   - `sidebar.ejs`: Dashboard sidebar
   - `doctor-detail.ejs`: Doctor profile card
   - `profilePhoto.ejs`: Profile picture display

2. **`admin/`** - Admin panel views
   - `dashboard.ejs`: Admin overview
   - `doctors.ejs`: Doctor management
   - `patients.ejs`: Patient list
   - `appointments.ejs`: Appointment management
   - `add_doctor.ejs`: Add/edit doctor form

3. **`doctor-dashboard/`** - Doctor interface
   - `admin.ejs`: Doctor dashboard
   - `newAppointments.ejs`: Pending appointments
   - `patientRecord.ejs`: Patient history
   - `addStaff.ejs`: Staff management

4. **`user-dashboard/`** - Patient interface
   - `index1.ejs`: Patient dashboard
   - `index2.ejs`: Book appointment
   - `index4.ejs`: Queue status
   - `index7.ejs`: Medical records
   - `index8.ejs`: Settings

5. **`main-page/`** - Public pages
   - `index.ejs`: Homepage
   - `Doctors.ejs`: Doctor listing
   - `doctorsBySpecialty.ejs`: Filtered doctors

**EJS Features Used**:
- `<%= variable %>`: Output escaped HTML
- `<%- html %>`: Output raw HTML
- `<% javascript %>`: Execute JavaScript
- `<%- include('partial') %>`: Include other templates

---

### 9. Public Assets (`public/`)

#### Directory Structure:

1. **`doctors/`** - Doctor panel assets
   - `admin.css`, `admin.js`: Admin dashboard styles/scripts
   - `style.css`, `index.js`: Doctor dashboard

2. **`main page/`** - Homepage assets
   - `asset/`: Images, icons, favicons
   - `script.js`, `script2.js`: Client-side logic
   - `style.css`, `style2.css`: Main page styles

3. **`page/`** - Page-specific stylesheets
   - `style1.css` through `style8.css`
   - Modular CSS for different sections

4. **`super-admin/`** - Admin panel assets
   - `menu.css`: Admin navigation styles
   - `style1.css`: Admin panel styles

5. **`uploads/`** - User-uploaded files
   - Profile pictures
   - Document uploads

**Asset Serving**:
```javascript
// In server.js
app.use(express.static(publicPath));

// Access in templates
<link rel="stylesheet" href="/page/style1.css">
<script src="/script.js"></script>
<img src="/uploads/profile.jpg">
```

---

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new patient | No |
| POST | `/verify-otp` | Verify OTP | No |
| POST | `/login/patient` | Patient login | No |
| POST | `/login/doctor` | Doctor login | No |
| POST | `/logout` | Logout user | Yes |
| POST | `/forget-password` | Request password reset | No |

### Patient Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/patient` | Patient dashboard | Patient |
| GET | `/api/appointment-booking` | Book appointment page | Patient |
| POST | `/appointment-booking` | Create appointment | Patient |
| GET | `/api/Queue-Status` | View queue position | Patient |
| GET | `/api/Medical-Records` | View medical records | Patient |
| POST | `/profile-picture` | Upload profile picture | Patient |
| PUT | `/patiet/Update-user-information` | Update profile | Patient |
| PUT | `/patiet/change-password` | Change password | Patient |
| DELETE | `/appointment/delete/:id` | Cancel appointment | Patient |

### Doctor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/staff` | Doctor dashboard | Doctor |
| GET | `/api/New-Appointments` | View new appointments | Doctor |
| GET | `/api/patient-record` | Patient records | Doctor |
| POST | `/appointments/:id/updateStatus` | Update appointment | Doctor |
| POST | `/add-staff` | Add staff member | Doctor |
| GET | `/staff-details/:id` | View staff details | Doctor |
| POST | `/update-staff-status` | Toggle staff status | Doctor |
| POST | `/remove-staff/:id` | Remove staff | Doctor |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/dashboard` | Admin dashboard | Admin |
| GET | `/admin/doctors` | List doctors | Admin |
| GET | `/admin/patients` | List patients | Admin |
| GET | `/admin/appointments` | List appointments | Admin |
| POST | `/admin/doctors/add` | Add doctor | Admin |
| POST | `/admin/doctors/edit/:id` | Edit doctor | Admin |
| POST | `/admin/doctors/delete/:id` | Delete doctor | Admin |
| POST | `/admin/notifications/send` | Send notification | Admin |

### Public Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Homepage | No |
| GET | `/nearest-doctors` | List all doctors | No |
| GET | `/doctor-details/:id` | Doctor profile | No |
| GET | `/specialty/:specialty` | Doctors by specialty | No |
| POST | `/reviews/:doctorId` | Submit review | Patient |

---

## ⚡ Real-time Features

The application uses **Socket.io** for real-time communication.

### Events Emitted:

1. **`new-appointment`**
   - **Triggered**: When patient books appointment
   - **Payload**: `{ appointment, doctorId }`
   - **Listeners**: Doctor dashboard
   - **Action**: Instantly displays new appointment

2. **`doctor-${doctorId}`**
   - **Triggered**: Doctor-specific updates
   - **Payload**: `{ message, newAppointment }`
   - **Listeners**: Specific doctor's dashboard
   - **Action**: Targeted notification

3. **`status-update`**
   - **Triggered**: When appointment status changes
   - **Payload**: `{ appointmentId, status, doctorId }`
   - **Listeners**: Patient dashboard
   - **Action**: Updates appointment card in real-time

### Implementation Example:

**Server-side** (`controller/appointment.js`):
```javascript
const io = req.app.get('io');
io.emit('new-appointment', {
  appointment: newAppointment,
  doctorId: doctorId
});
```

**Client-side** (in EJS template):
```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  
  socket.on('new-appointment', (data) => {
    // Update UI with new appointment
    console.log('New appointment:', data);
    updateAppointmentList(data.appointment);
  });
</script>
```

---

## 🔒 Security Features

### 1. **Password Security**
- All passwords hashed with **bcrypt** (10 rounds)
- Never stored in plain text

### 2. **JWT Authentication**
- Tokens stored in **HTTP-only cookies** (XSS protection)
- Tokens verified on every protected route

### 3. **OTP Verification**
- 6-digit OTP generated with `crypto.randomInt()`
- OTP hashed before storage
- 10-minute expiration
- One-time use (cleared after verification)

### 4. **Session Management**
- Express-session for admin authentication
- Session secret from environment variables
- Secure session cookies

### 5. **Input Validation**
- Mongoose schema validation
- Required fields enforcement
- Unique constraints on email and phone

### 6. **CORS Protection**
- CORS middleware configured
- Restricts cross-origin requests

### 7. **Environment Variables**
- Sensitive data in `.env` file
- Never committed to repository
- Different configs for dev/prod

### 8. **Role-Based Access Control**
- `restrictTo()` middleware
- Prevents unauthorized access
- Separate dashboards for each role

### Security Best Practices:
✅ Use HTTPS in production  
✅ Add rate limiting (express-rate-limit)  
✅ Implement CSRF protection  
✅ Add helmet.js for HTTP headers  
✅ Set JWT expiration times  
✅ Implement refresh tokens  
✅ Add input sanitization (express-validator)  
✅ Log security events  

---

## 📝 Sample Workflows

### Patient Booking Appointment

```
1. Patient registers (/signup)
   ↓
2. Receives OTP via email
   ↓
3. Verifies OTP (/verify-otp)
   ↓
4. Logs in (/login/patient)
   ↓
5. Browses doctors (/nearest-doctors)
   ↓
6. Views doctor details (/doctor-details/:id)
   ↓
7. Books appointment (/api/appointment-booking)
   ↓
8. Socket.io notifies doctor instantly
   ↓
9. Checks queue status (/api/Queue-Status)
   ↓
10. Receives real-time status updates
```

### Doctor Managing Appointments

```
1. Doctor logs in (/login/doctor)
   ↓
2. Views dashboard (/api/staff)
   ↓
3. Receives real-time notification (Socket.io)
   ↓
4. Reviews new appointment (/api/New-Appointments)
   ↓
5. Updates status (accept/decline)
   ↓
6. Socket.io notifies patient
   ↓
7. Views patient history (/api/patient-record)
   ↓
8. Completes appointment
   ↓
9. Appointment moves to records
```

### Admin Adding Doctor

```
1. Admin logs in (/admin/login)
   ↓
2. Navigates to doctors (/admin/doctors)
   ↓
3. Clicks "Add Doctor" (/admin/doctors/add)
   ↓
4. Fills form (credentials, qualifications, availability)
   ↓
5. Submits form (POST /admin/doctors/add)
   ↓
6. Doctor created with hashed password
   ↓
7. Doctor can now log in
```

---

## 🐛 Common Issues & Troubleshooting

### Issue 1: MongoDB Connection Failed
**Error**: `Error connecting to MongoDB`

**Solutions**:
```bash
# Check MongoDB is running
sudo service mongod status

# Check connection string in .env
MONGO_URI=mongodb://localhost:27017/hospital_opd

# For Atlas, ensure IP is whitelisted
```

### Issue 2: Email Not Sending
**Error**: `Error sending OTP email`

**Solutions**:
- Verify Gmail app password (not regular password)
- Enable "Less secure app access" (if not using app password)
- Check email and password in `.env`
- Ensure 2FA is enabled for app passwords

### Issue 3: Port Already in Use
**Error**: `EADDRINUSE: Port 3000 is busy`

**Solutions**:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=3001
```

### Issue 4: JWT Token Invalid
**Error**: Redirects to login repeatedly

**Solutions**:
- Check `JWT_Secret` in `.env` matches
- Clear browser cookies
- Check token expiration (add expiry to JWT)

### Issue 5: Socket.io Not Working
**Error**: Real-time updates not appearing

**Solutions**:
- Check browser console for Socket.io connection errors
- Ensure Socket.io client library is loaded
- Verify server logs for Socket.io initialization

---

## 🧪 Testing

### Manual Testing Steps:

1. **Authentication Flow**
   - Register new patient
   - Verify OTP
   - Login
   - Logout
   - Login again

2. **Appointment Flow**
   - Book appointment
   - Check queue status
   - Doctor accepts appointment
   - Verify patient receives update

3. **Real-time Testing**
   - Open patient dashboard in one browser
   - Open doctor dashboard in another
   - Book appointment
   - Verify instant notification appears

4. **Admin Functions**
   - Add new doctor
   - Edit doctor details
   - Delete doctor
   - Send system notification

---

## 🚀 Deployment

### Deploying to Production

#### 1. Prepare Environment
```bash
# Set NODE_ENV to production
NODE_ENV=production

# Use production MongoDB URI
MONGO_URI=your_production_mongodb_uri

# Generate strong JWT secret
JWT_Secret=your_very_secure_production_secret
```

#### 2. Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create hospital-opd-system

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_Secret=your_secret
heroku config:set EMAIL=your_email
heroku config:set PASSWD=your_app_password

# Deploy
git push heroku main

# Open app
heroku open
```

#### 3. Deploy to AWS/DigitalOcean

```bash
# SSH into server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/your-repo/hospital-opd-system.git
cd hospital-opd-system

# Install dependencies
npm install --production

# Set up environment variables
nano .env

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start server.js --name hospital-opd

# Set up Nginx reverse proxy
sudo nano /etc/nginx/sites-available/hospital
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Set Up SSL (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards:
- Use ES6+ syntax
- Follow existing code style
- Add comments for complex logic
- Update README for new features
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Developer

Developed with ❤️ for healthcare management.

---

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

## 🎯 Future Enhancements

- [ ] Video consultation integration
- [ ] Payment gateway for consultation fees
- [ ] SMS notifications (Twilio)
- [ ] Mobile app (React Native)
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Prescription management
- [ ] Lab report uploads
- [ ] Insurance integration
- [ ] Automated appointment reminders
- [ ] Doctor ratings and reviews dashboard
- [ ] Telemedicine features

---

## 📸 Screenshots

*(Add screenshots of your application here)*

1. Homepage
2. Patient Dashboard
3. Doctor Dashboard
4. Admin Panel
5. Appointment Booking
6. Queue Status

---

## 🙏 Acknowledgments

- Express.js team for the framework
- MongoDB team for the database
- Socket.io for real-time capabilities
- All open-source contributors

---

**⭐ If you find this project useful, please give it a star!**

---

*Last Updated: October 2025*

