import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBAbnGBeoy5mu-cDgDxry-bq9d2Erp0VbQ',
  authDomain: 'react-messenger-ccf46.firebaseapp.com',
  projectId: 'react-messenger-ccf46',
  storageBucket: 'react-messenger-ccf46.appspot.com',
  messagingSenderId: '1080935127693',
  appId: '1:1080935127693:web:5c14d6a1eb13ba157f20c4',
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
