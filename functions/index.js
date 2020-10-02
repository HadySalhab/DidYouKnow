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
const usersRoute = require("./routes/users");
const db = require("./config/db");
const app = express();
const cors = require("cors");

app.use(cors());
// Body Parser
app.use(express.json());

// Mount Routes
app.use("/facts", factsRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use(errorHandler);

exports.api = functions.region("australia-southeast1").https.onRequest(app);

// Triggers---------------

exports.createNotificationOnLike = functions
	.region("australia-southeast1")
	.firestore.document("likes/{id}")
	.onCreate(async (likeDocSnapshot) => {
		const factDocSnapshot = await db
			.doc(`/facts/${likeDocSnapshot.data().fact}`)
			.get();
		if (likeDocSnapshot.data().username === factDocSnapshot.data().username) {
			return; //no need to create a notification when user likes his own fact
		}
		try {
			await db.doc(`/notifications/${likeDocSnapshot.id}`).set({
				createdAt: new Date().toISOString(),
				receiver: factDocSnapshot.data().username,
				sender: likeDocSnapshot.data().username,
				type: "like",
				read: false,
				fact: factDocSnapshot.id,
			});
		} catch (error) {
			console.log(error);
		}
	});

exports.deleteNotificationOnUnlike = functions
	.region("australia-southeast1")
	.firestore.document("likes/{id}")
	.onDelete(async (likeDocSnapshot) => {
		try {
			await db.doc(`/notifications/${likeDocSnapshot.id}`).delete();
		} catch (error) {
			console.log(error);
		}
	});

exports.createNotificationOnComment = functions
	.region("australia-southeast1")
	.firestore.document("comments/{id}")
	.onCreate(async (commentDocSnapshot) => {
		const factDocSnapshot = await db
			.doc(`/facts/${commentDocSnapshot.data().fact}`)
			.get();
		if (
			commentDocSnapshot.data().username === factDocSnapshot.data().username
		) {
			return; //no need to create a notification when user post comment on his own fact
		}
		try {
			await db.doc(`/notifications/${commentDocSnapshot.id}`).set({
				createdAt: new Date().toISOString(),
				receiver: factDocSnapshot.data().username,
				sender: commentDocSnapshot.data().username,
				type: "comment",
				read: false,
				fact: factDocSnapshot.id,
			});
		} catch (error) {
			console.log(error);
		}
	});

// cascade delete
exports.onFactDelete = functions
	.region("australia-southeast1")
	.firestore.document("facts/{id}")
	.onDelete(async (factDocSnapshot, context) => {
		try {
			const factId = context.params.id;
			const batch = db.batch();
			const commentsDocQuerySnapshot = await db
				.collection("comments")
				.where("fact", "==", factId)
				.get();
			commentsDocQuerySnapshot.forEach((commentDoc) => {
				batch.delete(commentDoc.ref);
			});
			const likesDocQuerySnapshot = await db
				.collection("likes")
				.where("fact", "==", factId)
				.get();
			likesDocQuerySnapshot.forEach((likeDoc) => {
				batch.delete(likeDoc.ref);
			});
			const notificationsDocQuerySnapshot = await db
				.collection("notifications")
				.where("fact", "==", factId)
				.get();
			notificationsDocQuerySnapshot.forEach((notificationDoc) => {
				batch.delete(notificationDoc.ref);
			});
			await batch.commit();
		} catch (error) {
			console.log(error);
		}
	});
