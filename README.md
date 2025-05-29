# Task Management Application

A full-stack task management application built with NestJS and Angular.

## Features

- User authentication with JWT
- Role-based access control (Admin, Manager, User)
- Project management
- Task management with status and priority tracking
- Dashboard with statistics
- RESTful API with Swagger documentation

## Technology Stack

### Backend

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Swagger API Documentation

### Frontend

- Angular
- Angular Material
- RxJS
- TypeScript

## Project Structure

```
task-management/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── users/           # Users module
│   │   ├── projects/        # Projects module
│   │   ├── tasks/           # Tasks module
│   │   └── dashboard/       # Dashboard module
│   ├── docker-compose.yml   # Docker Compose configuration
│   └── Dockerfile           # Backend Dockerfile
└── frontend/                # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── auth/        # Authentication components and services
    │   │   ├── dashboard/   # Dashboard components
    │   │   ├── projects/    # Project management components
    │   │   ├── tasks/       # Task management components
    │   │   └── shared/      # Shared components, models, and services
    │   └── ...
    └── ...
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL

### Option 1: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a PostgreSQL database named `task_management`

4. Create a `.env` file in the backend directory with the following content:

   ```
   NODE_ENV=development
   PORT=3002
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=3600

   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=task_management
   ```

5. Start the backend server:
   ```
   npm run start:dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the frontend development server:

   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

### Option 2: Docker Setup (Backend only)

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Navigate to the backend directory:

   ```
   cd backend
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```
   NODE_ENV=development
   PORT=3002
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=3600

   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=task_management
   ```

4. Run the backend services using Docker Compose:

   ```
   docker-compose up -d
   ```

   This will start:

   - PostgreSQL database on port 5432
   - NestJS backend on port 3002

5. For the frontend, navigate to the frontend directory and run:

   ```
   npm install
   npm start
   ```

6. To stop the Docker containers:
   ```
   docker-compose down
   ```

## API Documentation

After starting the backend server, you can access the Swagger API documentation at:

```
http://localhost:3002/api
```

## Default Admin User

When the application runs for the first time, you can register a new user. The first user registered will automatically be assigned the Admin role.

## License

MIT
