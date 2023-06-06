# Express Application Example

This example demonstrates how to build an [express] application for AWS SignUp , Login,logout ,forget password , change password based on Cognito Service.

## Overview

This example built based on [aws-cognito-service].

## Prerequisite

You should install all dependencies.

- Nodejs
- AWS CLI
- NPM aws-sdk
- AWS account with User Role auth (userName , password)

## Usage

```
npm install
```

### Test locally

Do you not want to deploy this example? Or do you want to test before deploy? You can run it locally.

```
npm run start:dev
```

### Production build

Do you not want to deploy this example? Or do you want to test before deploy? You can run it locally.

```
npm run build
```

### Production build run

Do you not want to deploy this example? Or do you want to test before deploy? You can run it locally.

```
node dist/index.js
```

### API Routes

### Add User => Post Type (http://localhost:{port}/api/v1/user/cognito/signUp)

- Request Body

```
   {
           "name":"name",
           "password":"password",
           "email":"userEmail",
           "phoneNumber":"phoneNumber"

    }
```

### Resend Confirm Code to User => Post Type (http://localhost:{port}/api/v1/user/cognito/resend)

- Request Body

```
   {
           "email":"email"

    }

```

### Confirm Code For Signup User => Post Type (http://localhost:{port}/api/v1/user/cognito/confirm)

- Request Body

```
   {
           "email":"email" ,
           "code":"code"

    }

```

### User Forget Password => Post Type (http://localhost:{port}/api/v1/user/cognito/forget)

- Request Body

```
   {
           "email":"email"


    }

```

### User Forget Password Reset => Post Type (http://localhost:{port}/api/v1/user/cognito/passConfirm)

- Request Body

```
   {
           "email":"email" ,
           "code":"code" ,
           "newPassword":"newPassword"


    }

```

### User Login => Post Type (http://localhost:{port}/api/v1/user/cognito/login)

- Request Body

```
 {
      "email":"email"
      "password":"password"
 }

```

### User Change Password => Post Type (http://localhost:{port}/api/v1/user/cognito/change)

- Request Body

```
   {

           "oldPassword":"oldPassword",
           "newPassword":"newPassword",
           "token" :"token"   // Access Token

    }
```

### Deactive/Active User => Post Type (http://localhost:{port}/api/v1/user/cognito/disable)

- Request Body

```
  {
      "email" :"email",
       "type":"Active"    // Pass this key to active user other wise not pass
  }

```

### User Single device/global device signout => Post Type (http://localhost:{port}/api/v1/user/cognito/signout)

- Request Body

```
  {
      "deviceKey" :"deviceKey",
      "email" : "eamil",
      "type":"Single Device"    // for single device logout key other wise not pass
  }

```

### User listing => Post Type (http://localhost:{port}/api/v1/user/cognito/list)

- Request Body

```
  {
      "pageSize" :"pageSize",             // for pagination
      "nextPageToken" : "nextPageToken",   // for pagination

  }

```

### User Refresh Session Token => Post Type (http://localhost:{port}/api/v1/user/cognito/refreshSession)

- Request Body

```
  {
      "refreshToken" :"refreshToken",
      "accessToken" : "accessToken",

  }

```

### User Delete => Post Type (http://localhost:{port}/api/v1/user/cognito/delete)

- Request Body

```
  {
      "email" :"email",


  }

```

### This test case verifies the functionality of creating a new user

### Post Type API (http://localhost:{port}/api/v1/user/cognito/signUp)

- Test Case 1: "should create a new user"

It sends a POST request to the "/api/v1/user/cognito/signUp" endpoint with valid user data.
Expects the response status code to be 201 (Created).
Expects the response body to be { message: 'Signup sucessfully' }.

- Test Case 2: "should return an error for duplicate email"

First, it creates a user with the same email by sending a POST request to the "/api/v1/user/cognito/signUp" endpoint.
Then, it sends another POST request to the same endpoint with the same user data.
Expects the response status code to be 400 (Bad Request).
Expects the response body to be { error: 'An account with the given email already exists' }.

### This test case verifies the functionality of user authentication through the login API endpoint.

### Post Type API (http://localhost:{port}/api/v1/user/cognito/login)

- Test Case 1: "should authenticate a user and return a token"

First, it creates a user by sending a POST request to the "/api/v1/user/cognito/login" endpoint.
Then, it sends a POST request to the "/api/v1/user/cognito/login" endpoint with valid credentials.
Expects the response status code to be 200 (OK).
Expects the response body to have a property named 'token'.

- Test Case 2: "should return an error for invalid credentials"

It sends a POST request to the "/api/v1/user/cognito/login" endpoint with invalid credentials.
Expects the response status code to be 401 (Unauthorized).
Expects the response body to be { error: 'Invalid email or password' }.

### This test case verifies the functionality of email verification using the verification OTP.

### Post Type API (http://localhost:{port}/api/v1/user/cognito/confirm)

- Test Case 1: "should verify user email"

First, it creates a user by sending a POST request to the "/api/v1/user/cognito/signUp" endpoint.
Retrieves the verification OTP from an eamil register at a time of signup.
Then, it sends a post request to the "/api/v1/user/cognito/confirm" endpoint with the obtained OTP.
Expects the response status code to be 200 (OK).
Expects the response body to be { message: 'Email verified successfully' }.

- Test Case 2: "should return an error for an invalid OTP"

It sends a GET request to the "/api/v1/user/cognito/confirm" endpoint with an invalid OTP.
Expects the response status code to be 400 (Bad Request).
Expects the response body to be { error: 'Invalid OTP' }.
