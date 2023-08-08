
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);

// Deploy to Firebase Hosting
// You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

// Sign in to Google
// firebase login ///////////////////
// Initiate your project
// Run this command from your app's root directory:

// firebase init ///////////////////
// When you're ready, deploy your web app
// Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:

// firebase deploy ////////////////
// After deploying, view your app at react-native-goit-hw-06.web.app

// Need help? Check out the Hosting docs
