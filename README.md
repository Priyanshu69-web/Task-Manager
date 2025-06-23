# Task Manager Project

## Project Description

This is a full-stack Task Manager application with a React frontend and an Express backend. The app allows users to sign up, log in, and manage tasks. There are admin and user roles with different dashboards and functionalities.

## Technologies Used

- Backend: Node.js, Express, MongoDB (via Mongoose)
- Frontend: React, React Router, Vite
- Authentication: JWT
- Deployment: Render

## Project Structure

- `backend/`: Express backend API and server
- `frontend/Task-Manager/`: React frontend application

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend/Task-Manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will be available at `http://localhost:3000`.

### Building for Production

1. From the frontend folder, build the production files:
   ```bash
   npm run build
   ```
2. This will create a `dist` folder with the production-ready frontend.

### Deployment Notes

- The backend serves the frontend production build from the `frontend/Task-Manager/dist` folder.
- A catch-all route is configured in the backend to support client-side routing and prevent "not found" errors on page refresh.
- Make sure to build the frontend before deploying.
- Deploy both backend and frontend build together on Render or your preferred hosting.

## API Routes Overview

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/users` - Get users (admin)
- `GET /api/tasks` - Get tasks
- Other routes for reports, tasks, users as per controllers

## Frontend Routes Overview

- `/login` - Login page
- `/signUp` - Signup page
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/tasks` - Manage tasks (admin)
- `/admin/users` - Manage users (admin)
- `/user/dashboard` - User dashboard (protected)
- `/user/tasks` - User tasks
- `/user/task-details/:id` - Task details

## Environment Variables

- `PORT` - Backend server port
- `MONGO_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL for CORS
- `JWT_SECRET` - Secret key for JWT authentication

## Notes

- Ensure MongoDB is running and accessible.
- Use the provided `.env` variables for configuration.
- For any issues with page refresh showing "not found", ensure the backend is serving the frontend build and the catch-all route is configured.

## License

This project is licensed under the MIT License.
