import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const admin = require('firebase-admin');

const serviceAccount = require('./serviceAcountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-messenger-ccf46-default-rtdb.firebaseio.com',
});

// Initialize Firebase
initializeApp(firebaseConfig);

export const FBauth = getAuth();
FBauth.languageCode = 'ko';
export const FBdb = getFirestore();
export const FBstorage = getStorage();
