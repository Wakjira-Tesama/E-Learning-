# 🎓 E-Learning Platform

> A full-stack Learning Management System (LMS) built with the MERN stack, enabling instructors to create courses and students to enroll and learn.

![Project Banner](https://via.placeholder.com/1200x400?text=E-Learning+Platform+Banner)

## 🚀 Overview

This comprehensive E-Learning Platform provides a seamless experience for both students and instructors. It features robust authentication, course management, video streaming, progress tracking, and secure payments. Designed with a modern, responsive UI using React and Tailwind CSS.

## ✨ Key Features

### 👨‍🎓 For Students
- **Course Discovery**: Browse and search for courses by category and level.
- **My Learning**: Track enrolled courses and progress.
- **Video Player**: High-quality video playback for lectures.
- **Progress Tracking**: innovative progress bars and completion status.
- **Secure Payments**: Integrated Stripe payment gateway for purchasing courses.
- **Profile Management**: Update personal details and profile picture.

### 👩‍🏫 For Instructors (Admin)
- **Dashboard**: Analytics on course sales and student enrollment.
- **Course Management**: Create, edit, and publish new courses.
- **Lecture Management**: Add video lectures, descriptions, and free previews.
- **Rich Text Editor**: Format course descriptions beautifully.

### 🛠 General
- **Authentication**: Secure login/signup with JWT and HTTP-only cookies.
- **Dark Mode**: Fully supported dark/light theme switching.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## 🏗 Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI) + Lucide React Icons
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Form/Data**: Axios, React Hook Form (implied)
- **Media**: React Player

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **Payments**: [Stripe](https://stripe.com/)

## 🏛 Architecture

### System Overview

```mermaid
graph TD
    User[User Client] -->|HTTP/HTTPS| Frontend[React Frontend]
    Frontend -->|REST API| Backend[Express Server]
    Backend -->|Queries| DB[(MongoDB Database)]
    Backend -->|Uploads/Streams| Cloudinary[Cloudinary Media]
    Backend -->|Payments| Stripe[Stripe Payment Gateway]
    
    subgraph Client
        Frontend
        Store[Redux Store]
    end
    
    subgraph Server
        Backend
        Auth[Auth Middleware]
        Controllers
        Models
    end
```

### User Flow

```mermaid
sequenceDiagram
    participant Student
    participant Client
    participant Server
    participant DB
    
    Student->>Client: Login
    Client->>Server: POST /login
    Server->>DB: Validate User
    DB-->>Server: User Data
    Server-->>Client: JWT Cookie + User Info
    
    Student->>Client: View Course
    Client->>Server: GET /course/:id
    Server->>DB: Fetch Course Details
    DB-->>Server: Course Data
    Server-->>Client: Render Course
    
    Student->>Client: Purchase Course
    Client->>Server: POST /purchase
    Server->>DB: Create Order
    Server-->>Client: Course Unlocked
```

## 🗄 Database Schema

The application uses a relational-style schema within MongoDB using References.

```mermaid
erDiagram
    User ||--o{ Course : "creates (instructor)"
    User ||--o{ Course : "enrolls (student)"
    User ||--o{ CoursePurchase : "purchases"
    
    Course ||--|{ Lecture : "contains"
    Course ||--o{ CoursePurchase : "is_purchased"
    
    User {
        string name
        string email
        string password
        string role
        string photoUrl
    }
    
    Course {
        string courseTitle
        string category
        string level
        number price
        string thumbnail
        boolean isPublished
    }
    
    Lecture {
        string title
        string videoUrl
        boolean isPreviewFree
    }
    
    CoursePurchase {
        number amount
        string status
        string paymentId
    }
```

## 📸 Screen Sheets (Screenshots)

> **Note**: Add your actual application screenshots in the folders below and update the paths.

### Student Portal
| **Home Page** | **Course Detail** |
|:---:|:---:|
| ![Home Page](https://via.placeholder.com/400x250?text=Hero+Section+&+Courses) | ![Course Detail](https://via.placeholder.com/400x250?text=Course+Details+&+Curriculum) |
| *Browse courses and categories* | *View course content and enroll* |

### Learning Experience
| **Video Player** | **My Learning** |
|:---:|:---:|
| ![Video Player](https://via.placeholder.com/400x250?text=Video+Player+Interface) | ![My Learning](https://via.placeholder.com/400x250?text=Student+Dashboard) |
| *Watch lectures with progress tracking* | *Manage your enrolled courses* |

### Instructor Dashboard
| **Admin Dashboard** | **Create Course** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/400x250?text=Instructor+Analytics) | ![Create Course](https://via.placeholder.com/400x250?text=Course+Creation+Form) |
| *View sales and enrollment stats* | *Builder interface for new courses* |

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Stripe Account

### 1. Clone the Repository
```bash
git clone https://github.com/Wakjira-Tesama/E-Learning-.git
cd E-Learning-
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Start the client:
```bash
npm run dev
```

---
Made with ❤️ by [Wakjira Tesama](https://github.com/Wakjira-Tesama)
