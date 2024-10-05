# Backend Express TypeScript Project

## Description

This project is a backend API built with Express.js and TypeScript. The API manages book borrowings, users, and books, implementing authentication JWT for token validation. Sequelize is used for database management and communication with MySQL.

## Features

- **Authentication**: Users can log in with JWT-based authentication using cookies.
- **Book Management**: API for managing books (adding, editing, deleting).
- **Borrowing System**: Allows users to borrow books.
- **Relational Database**: Sequelize is used to handle relationships between users, books, and borrowings.

## Project Structure

.
├── src
│ ├── config # Database configuration (Sequelize)
│ ├── controllers # Business logic for handling requests
│ ├── helpers # Utility functions (e.g., JWT token extraction)
│ ├── middleware # Auth middleware to protect routes
│ ├── models # Sequelize models for users, books, borrowing
│ ├── routes # API routes
│ └── types # TypeScript types and interfaces
├── .env # Environment variables
├── package.json
└── README.md


## Environment Variables

Before running the project, create a `.env` file in the root directory with the following content:

```plaintext
APP_NAME=BackendExpressTS
APP_PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
JWT_SECRET=your_jwt_secret
```


## Setup Instructions

1. **Clone the Repository**

   ```js
   git clone https://github.com/yourusername/backend-express-ts.git
   cd backend-express-ts
   ```
2. **Install Dependencies**
   Make sure you have Node.js and npm installed. Then, run:

   `npm install`
3. **Database Setup**
   Ensure you have PostgreSQL installed and running. Create the database specified in the `.env` file, or update the `.env` file with the correct credentials.
   Run the Sequelize migrations to create the necessary tables in the database:

   `npx sequelize-cli db:migrate`
4. **Run the Application**
   You can run the app locally with the following command:
   `npm run dev`

   This will start the server at `http://localhost:5000` (or the port specified in `.env`).
