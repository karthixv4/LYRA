// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkl-hof48ipTwiFnCqsR0cVWq666DmXvM",
  authDomain: "fir-luna-lyra.firebaseapp.com",
  projectId: "fir-luna-lyra",
  storageBucket: "fir-luna-lyra.appspot.com",
  messagingSenderId: "474806541103",
  appId: "1:474806541103:web:0048c9c2da7bcf803e1fda",
  measurementId: "G-86GPQT6TWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;