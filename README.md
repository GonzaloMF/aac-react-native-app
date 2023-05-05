# aac-react-native-app (Keyboard for You)

This is a React Native application developed as part of a university dissertation for Swansea University. 
The app focuses on providing Augmentative and Alternative Communication (AAC) solutions for users with speech and language difficulties.

## Features

- Browse through categories and pictograms
- Add local pictograms
- Customizable boards
- Firebase login functionality (currently commented out)

## Getting Started

These instructions will help you set up the project and run it on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Expo CLI
- A Firebase project with authentication enabled (optional)

### Installation

1. Clone the repository: git clone https://github.com/GonzaloMF/aac-react-native-app.git

2. Navigate to the project directory: cd aac-react-native-app

3. Install the required dependencies: npm install

4. (OPTIONAL) Create a 'Firebase.js' file in the 'src/utils' folder and add your Firebase configuration, uncomment the Firebase lines on App.js, LoginScreen.js and Profile.jsx. 
Note that this file should not be pushed to the repository and should be added to the '.gitignore'.

```javascript
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```

## Running the App
To run the app in development mode, execute the following command: expo start or npm start