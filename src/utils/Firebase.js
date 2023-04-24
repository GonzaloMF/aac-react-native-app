import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsCzNmnQJvzwC2mmppC883Djyerk5Ey7A",
  authDomain: "aac-react-native.firebaseapp.com",
  projectId: "aac-react-native",
  storageBucket: "aac-react-native.appspot.com",
  messagingSenderId: "743342648928",
  appId: "1:743342648928:web:b3f7e3f37d26734f9a5d05"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();

export { auth, storage, database };
