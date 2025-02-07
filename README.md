# OAuth 2.0 REST API
This project implements an OAuth 2.0 REST API in TypeScript, providing two main endpoints:

1. `Authorization Endpoint`: Handles the OAuth 2.0 authorization request and returns an authorization code.

2. `Token Endpoint`: Exchanges the authorization code for an access token and optionally supports refresh tokens.

The API is built using Express for the server, TypeScript for type safety, and JOSE for JWT operations.

## Features
`OAuth 2.0 Compliance`: Implements the OAuth 2.0 authorization code flow.

`JWT-Based Tokens`: Uses JSON Web Tokens (JWTs) for access and refresh tokens.

`TypeScript`: Ensures type safety and better developer experience.

`Minimal Dependencies`: Uses only essential libraries like express and jose.

`Refresh Token Support`: Optionally supports refresh tokens for token renewal.

## Prerequisites
Before running the project, ensure you have the following installed:
    - `Node.js` (v20 or higher)
    - `npm` (v9 or higher)
    - `TypeScript` (v5 or higher)

## Setup
1. Clone the repository
    ```bash
    git clone https://github.com/your-username/oauth2-api.git
    cd oauth2-api
    ```
2. Install Dependencies
    ```bash
    npm install
    ```
3. Set Up Environment Variables:
    - Create a .env file in the root directory.

    - Add the following variables:
        ```bash
        PORT=8080
        CLIENT_ID=upfirst
        REDIRECT_URI=http://localhost:8081/process
        JWT_SECRET=your-secret-key
        JWT_EXPIRES_IN=1h
        REFRESH_TOKEN_EXPIRES_IN=7d
        ```
4. Start Project
    ```bash
    npm start
    ```

## Testing
### Using Postman
1. Authorization Endpoint:
    - Send a GET request to:
        ```bash
        http://localhost:8080/api/oauth/authorize?response_type=code&client_id=upfirst&redirect_uri=http://localhost:8081/process&state=SOME_STATE
        ```
    - Verify the redirect URL contains the `code` and `state` parameters.

2. Token Endpoint:
    - Send a POST request to:
        ```bash
        http://localhost:8080/api/oauth/token
        ```
    - Set the `Content-Type` header to `application/x-www-form-urlencoded`.
    - 