// const { initializeApp } = require("firebase/app");
// // const getAnalytics = require("firebase/analytics");
// const { getFirestore } = require("firebase/firestore");

// const firebaseConfig = {
//     apiKey: "AIzaSyDOK-MyaV6baqU3A947C8uBABOq-9B1eZI",
//     authDomain: "media-streaming-828d6.firebaseapp.com",
//     projectId: "media-streaming-828d6",
//     storageBucket: "media-streaming-828d6.firebasestorage.app",
//     messagingSenderId: "136641995174",
//     appId: "1:136641995174:web:87ac18b5af7732756def67",
//     measurementId: "G-ZFGQF48QT7"
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = getFirestore(app);

// module.exports = { app };

const admin = require('firebase-admin');
const fs = require("fs");
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

require('dotenv').config();

const SA = JSON.parse(fs.readFileSync(process.env.SERVICE_ACCOUNT, "utf8"))

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(SA),
  databaseURL: process.env.DATABASE_URL
});

// Initialize Firebase App
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);

module.exports = { db, auth, admin };