const { initializeApp } = require("firebase/app");
// const getAnalytics = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDOK-MyaV6baqU3A947C8uBABOq-9B1eZI",
    authDomain: "media-streaming-828d6.firebaseapp.com",
    projectId: "media-streaming-828d6",
    storageBucket: "media-streaming-828d6.firebasestorage.app",
    messagingSenderId: "136641995174",
    appId: "1:136641995174:web:87ac18b5af7732756def67",
    measurementId: "G-ZFGQF48QT7"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

module.exports = { app };