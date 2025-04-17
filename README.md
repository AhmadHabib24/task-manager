# Mini Task Manager App

A full-stack task management application built with React, Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 JWT Authentication for secure access
- 👤 User management (create, list, get by ID)
- ✅ Task management (CRUD operations)
- 🔍 Filter tasks by status
- 📋 Task listing with pagination
- 📱 Responsive design
- 🚦 Loading & error states
- ✍️ Form validation

## Tech Stack

**Frontend:**
- React with TypeScript
- React Router for navigation
- Axios for API requests
- Context API for state management

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

The project is organized into two main directories:

- `backend/`: Contains the Node.js/Express server code
- `frontend/`: Contains the React application code

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Setup and Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
```

Now edit the `.env` file with your MongoDB connection string and JWT secret:

```
MONGO_URI=mongodb://localhost:27017/task-manager
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=30d
```

To start the backend development server:

```bash
npm run dev
```

### 3. Frontend Setup

In a new terminal:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/profile`: Get user profile (protected)

### Users
- `POST /api/users`: Create a user
- `GET /api/users`: List all users
- `GET /api/users/:id`: Get a specific user

### Tasks
- `POST /api/tasks`: Create a task (protected)
- `GET /api/tasks`: List all tasks (with pagination and filtering)
- `GET /api/tasks/:id`: Get a specific task
- `PUT /api/tasks/:id`: Update a task (protected)
- `DELETE /api/tasks/:id`: Delete a task (protected)

## Running in Production

### Building the Backend

```bash
cd backend
npm run build
```

### Building the Frontend

```bash
cd frontend
npm run build
```

The frontend build will be in the `frontend/build` directory, which can be served by a static file server.

## Database Schema

### User

```typescript
{
  name: string;
  email: string;
  password: string; // hashed
}
```

### Task

```typescript
{
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: mongoose.ObjectId (ref User);
  createdAt: Date;
}
```

## Testing the Application

1. Register a new user or login with an existing account
2. Create tasks by clicking on the "Add New Task" button
3. View, edit, and delete tasks from the main dashboard
4. Filter tasks by status using the dropdown menu
5. Navigate through paginated results using the pagination controls

## License

This project is licensed under the MIT License.
