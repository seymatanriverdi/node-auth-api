# Node.js Auth API

--> Features
- JWT Authentication (Access + Refresh Token)
- Role-based Authorization (admin/user)
- Protected Routes
- Validation (Joi)
- Global Error Handling
- Clean Architecture (Controller-Service-Model)
- MongoDB (Mongoose)
- Dockerized with Docker Compose

--> Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Docker

--> Auth Flow
- Login → Access + Refresh Token
- Access Token → API calls
- Refresh Token → Get new Access Token
- Logout → Invalidate Refresh Token

--> Run with Docker

```bash
docker compose up --build

create .env file
  PORT=3000
  MONGO_URI=your_mongo_uri
  JWT_SECRET=your_secret

Endpoints
  POST /register
  POST /login
  GET /profile (protected)
  GET /users (admin only)
