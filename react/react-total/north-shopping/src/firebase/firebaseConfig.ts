// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQmK_IRbmyT1ob55TU0a8hGOkpwIDQnSA",
  authDomain: "north-test-b24ae.firebaseapp.com",
  projectId: "north-test-b24ae",
  storageBucket: "north-test-b24ae.firebasestorage.app",
  messagingSenderId: "64498998269",
  appId: "1:64498998269:web:419829fa56f938dd31d794",
  measurementId: "G-FKSRE5DZD3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
