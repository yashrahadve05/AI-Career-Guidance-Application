# AI Career Guidance Application

A full-stack MERN application that helps students and early professionals discover suitable career paths by analyzing their skills, interests, education, and experience level.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Authentication**: Clerk

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Clerk account with API keys

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai_career_guidance
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   ```

4. Seed the database with sample career data:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Features

- **User Authentication**: Sign up and sign in using Clerk
- **Profile Management**: Users can set up their profile with skills, interests, education, and experience
- **Career Assessment**: Complete an assessment to get personalized recommendations
- **AI-Powered Recommendations**: Get career recommendations based on:
  - Skills match (40%)
  - Interests match (30%)
  - Education match (20%)
  - Experience level (10%)
- **Career Roadmaps**: View detailed learning roadmaps for each recommended career
- **Match Scores**: See detailed breakdown of how well each career matches your profile

## API Endpoints

### User Routes
- `GET /api/users/profile` - Get user profile
- `POST /api/users/profile` - Create user profile
- `PUT /api/users/profile` - Update user profile

### Career Routes
- `GET /api/careers` - Get all careers
- `GET /api/careers/recommendations` - Get personalized career recommendations

## Notes

- Make sure MongoDB is running before starting the backend server
- Configure your Clerk keys in both frontend and backend `.env` files
- The application uses JWT tokens from Clerk for authentication
- After signing up, users are redirected to the profile setup page

