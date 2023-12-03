# File Sharing System - Backend

This project is a backend implementation of a secure file-sharing system between Operation Users (Ops Users) and Client Users.

## Features

### Operation Users (Ops Users)

1. **Login**
2. **Upload File**
   - Only Ops Users are allowed to upload pptx, docx, and xlsx files.

### Client Users

1. **Sign Up**
   - Returns an encrypted URL.
2. **Email Verify**
   - Verification email will be sent to the user on the registered email.
3. **Login**
4. **Download File**
   - Accessible through a secure, encrypted URL.
   - Only accessible by Client Users.
5. **List Uploaded Files**

## Implementation

### Technologies Used

- Node.js
- Express.js
- MongoDB (or your preferred database)
- JWT for authentication
- Nodemailer for sending verification emails

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>

2. npm install

3. API Routes

    Ops Users
        POST /api/ops/login
        POST /api/ops/upload-file
    Client Users
        POST /api/users/signup
        POST /api/users/verify-email/:token
        POST /api/users/login
        GET /api/users/download-file/:assignmentId
        GET /api/users/list-uploaded-files


Make sure to replace `https://github.com/Navinmanohar/test` and `test` with your actual repository URL and project folder name.

This README provides an overview of the project, installation instructions, API routes, contribution guidelines, information on reporting issues, and the project's license. Feel free to customize it based on your specific project details and requirements.
