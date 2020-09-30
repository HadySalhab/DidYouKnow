const admin = require("firebase-admin");
const functions = require("firebase-functions");
const firebase = require("firebase");

const firebaseConfig = {
	apiKey: "AIzaSyBXK_sc7ub8vZwqOJt1q6aXPg53WLkv3C4",
	authDomain: "did-you-know-e5c9c.firebaseapp.com",
	databaseURL: "https://did-you-know-e5c9c.firebaseio.com",
	projectId: "did-you-know-e5c9c",
	storageBucket: "did-you-know-e5c9c.appspot.com",
	messagingSenderId: "21484365886",
	appId: "1:21484365886:web:208706a1c71b94abc1c96f",
	measurementId: "G-NX812QM8JK",
};
// Registering our App to Firebase Project
firebase.initializeApp(firebaseConfig);

// default app is set in .firebaserc file
admin.initializeApp();

const express = require("express");
const factsRoute = require("./routes/facts");
const authRoute = require("./routes/auth");

const app = express();

// Body Parser
app.use(express.json());

// Mount Routes
app.use("/facts", factsRoute);
app.use("/auth", authRoute);

exports.api = functions.region("australia-southeast1").https.onRequest(app);
