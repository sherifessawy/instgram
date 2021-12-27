// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { seedDatabase } from '../seed';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj3rGuMY9n-4kt8GHixk8mlHqQvgxVbhE",
  authDomain: "myinstgram-390ff.firebaseapp.com",
  projectId: "myinstgram-390ff",
  storageBucket: "myinstgram-390ff.appspot.com",
  messagingSenderId: "78129236829",
  appId: "1:78129236829:web:3c11f743e7e36234d6b6b4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//seedDatabase(firebaseApp)

export {firebaseApp}
