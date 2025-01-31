const admin = require("firebase-admin");
const fs = require("fs");

// Load Firebase service account JSON
const serviceAccount = JSON.parse(fs.readFileSync("media-streaming-828d6-52e861583d1f.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
