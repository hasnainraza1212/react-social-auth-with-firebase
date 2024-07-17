# Social Auth Firebase

This project, `social-auth-firebase`, is a React application that integrates social authentication using Firebase. It provides a user-friendly authentication system, allowing users to log in using various social media accounts. The application is styled with Material UI and Emotion, and uses Vite as the build tool.

## Features

- Social authentication with Firebase
- React 18 and React Router for front-end
- Styling with @mui/material and @emotion
- Axios for API requests
- Integration of `lightbox.js-react` for image presentations
- Moment.js for date manipulations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.x or later)
- npm (v7.x or later)

## Installation

Clone the repository to your local machine:


git clone https://github.com/hasnainraza1212/react-social-auth-with-firebase
cd social-auth-firebase
Install the necessary dependencies:


npm install
Available Scripts
In the project directory, you can run:

npm run dev
Runs the app in the development mode using Vite.
Open http://localhost:3000 to view it in the browser.

npm run build
Builds the app for production to the dist folder using Vite.
It correctly bundles React in production mode and optimizes the build for the best performance.

npm run lint
Lints the project files using ESLint, helping maintain code quality standards.

npm run preview
Serves the production build from the dist folder, allowing you to preview the production build locally.

Configuration
To integrate Firebase, create a .env file in the root directory and add your Firebase configuration keys like so:

REACT_APP_FIREBASE_API_KEY="your-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"
Ensure that these values are kept secure and are not exposed publicly.

Deployment
To deploy the project, you can use platforms like Vercel, Netlify, or any static site hosting service that supports single-page applications.

Contributing
Contributions are welcome! Feel free to open pull requests or issues to improve the functionality or documentation.

License
This project is licensed under the MIT License - see the LICENSE file for details.
