## ASSEST TRADING TRACKER

## Postman Documentation
https://documenter.getpostman.com/view/28173427/2sA3s6DpKL

## Docker repositry
docker pull ashu2764/assesttradingtracker-api


# Overview
    This project provides an API for managing asset trades between users. It includes user authentication, asset management, and trading functionalities. The backend is built using Node.js, Express.js, and MongoDB.

# Features
    User Authentication: Sign up, login, and token-based authentication.
    Asset Management: CRUD operations for managing assets.
    Trading System: Allows users to trade assets, with verification and logging of transactions.
    Role-Based Access Control: Ensures only authorized users can perform certain actions.

# Technologies
    Node.js: JavaScript runtime for the backend.
    Express.js: Web framework for building the API.
    MongoDB: NoSQL database for storing users and assets.
    JWT: JSON Web Tokens for secure authentication.
    Mongoose: ODM library for MongoDB and Node.js.
    Postman: API testing tool.


# Prerequisites
    Node.js
    MongoDB
    Postman


# Installation
    Clone the repository: git clone https://github.com/ashu2764/Assest_trading_tracker.git
    cd Assest_trading_tracker


# Install dependencies:
$    -> npm install $


# Environment Variables:
$    Create a .env file in the root of the project and add the following variables:
    PORT = 8000
    MONGODB_URI= 
    CORS_ORIGIN =*

    ACCESS_TOKEN_SECRET=example-eidcnkcu8ejwwdwjdi
    ACCESS_TOKEN_EXPIRY = 1d

    REFRESH_TOKEN_SECRET=example-eidcnkcu8ejwwdwjdi
    REFRESH_TOKEN_EXPIRY=10d

    CLOUDINARY_CLOUD_NAME= 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECERET = 
$

# Start the server:
$
    --> npm start
    --> npm run dev - To run with Postrman
    The server will start on http://localhost:8000.
$

# API Endpoints

# Authentication

$
    POST /register
    Register a new user.
    Request Body: json

    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "yourpassword"
    }

$


$

POST /login

    Log in a user and retrieve a JWT token.
    Request Body:
    json

    {
        "email": "john@example.com",
        "password": "yourpassword"
    }
    

$

## Folder Structure

|-- public/
|   |-- temp/
|  
|-- src/
    |-- db/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- middleware/
|   |-- utils/
| 
|-- .prettierignore
|-- .prettierrc  
|-- .env
|-- .gitignore
|-- package.json
|-- README.md