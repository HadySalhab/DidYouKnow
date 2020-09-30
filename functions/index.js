const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const factsRoute = require("./routes/facts");

const app = express();

// default app is set in .firebaserc file
admin.initializeApp();

// Body Parser
app.use(express.json());

// Mount Routes
app.use("/facts", factsRoute);

exports.api = functions.https.onRequest(app);
