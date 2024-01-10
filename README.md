# Task Manager Backend

## Overview

This repository contains the backend code for a Task Manager application. The Task Manager allows users to create, update, and manage tasks, providing a RESTful API to interact with the application's database.

## Features

- **User Authentication:** Secure user authentication using [insert authentication method/library].
- **Task CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Date Validation:** Ensures tasks have valid start and end dates.
- **Status Tracking:** Tasks can have different statuses (e.g., ongoing, completed).
- **User Management:** Users can register, login, and manage their tasks.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **Prisma:** Database toolkit for interfacing with the database.
- **[Database System]:**  PostgreSQL for data storage.
- **[Authentication Library]:** jsonwebtoken for user authentication.
- **[Other Libraries/Tools]:**  zod , bcrypt,dotenv etc...

## Setup

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]

2. **Install Dependencies:**

  ```javascript
   cd task-manager-backend
   npm install
  ```
3. **Start the Server:**
  ``` bash npm start```
   

 ## API Endpoints
   - POST /api/auth/register : Register a new user.
   - POST /api/auth/login : Authenticate and login a user.
   - GET /api/tasks : Get a list of tasks.
   - GET /api/ : Get profile of a authenticated user.
   - POST /api/tasks : Create a new task.
   - PUT /api/tasks/:taskId : Update an existing task.
   - DELETE /api/tasks/:taskId : Delete a task.
   - DELETE /api/users/:userID : Delete a user.
   - PUT /api/users/:taskId : Update an existing user.
   - GET /api/users : Update an existing task.

