const admin = require("firebase-admin");
// default app is set in .firebaserc file
admin.initializeApp();

const firebase = require("firebase");
const firebaseConfig = require("./config/config");
// Registering our App to Firebase Project
firebase.initializeApp(firebaseConfig);

const functions = require("firebase-functions");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const factsRoute = require("./routes/facts");
const authRoute = require("./routes/auth");

const app = express();

// Body Parser
app.use(express.json());

// Mount Routes
app.use("/facts", factsRoute);
app.use("/auth", authRoute);
app.use(errorHandler);

exports.api = functions.region("australia-southeast1").https.onRequest(app);
