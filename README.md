# Axis

Welcome to the Axis project! This Node.js project provides a robust framework with authentication and comprehensive API documentation.

## Clone the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/mayarassem9/Axis_assessment.git
```
## Installation
Navigate to the project directory and install the dependencies:

```bash
cd Axis_assessment
npm install
```
## Running the Project
To start the project, run the following command:

```bash
nodemon app.js
```
This will start the server with nodemon, which will automatically restart the server upon detecting any changes in the source files.

## API Documentation
The project uses Swagger for API documentation. Once the server is running, you can access the Swagger documentation at:

```bash
http://localhost:3000/api-docs
```
This provides a user-friendly interface to explore and test the API endpoints.

## for the database connection
The project uses MongoDB for the database localised. So ensure you have MongoDB installed and running on your local machine.

## Authentication
The project uses JWT (JSON Web Token) for authentication. Ensure you include the JWT token in the Authorization header for all protected routes.

