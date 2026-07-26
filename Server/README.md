# Jira Clone Server

This is the backend API for a Jira-style project management application.

## Features
- User authentication with JWT
- Project CRUD operations
- Task CRUD operations
- Protected routes for authenticated users

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `PORT` (optional)
   - `VITE_URL` (optional, for frontend CORS)
3. Start the server:
   ```bash
   npm run dev
   ```

## API Base URL
- `http://localhost:3200`
