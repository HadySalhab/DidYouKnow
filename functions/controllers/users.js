const asyncHandler = require("../middlewares/asyncHandler");
const BusBoy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const admin = require("firebase-admin");
const config = require("../config/config");
const db = require("../config/db");
const { v4 } = require("uuid");
const ErrorResponse = require("../utils/ErrorResponse");
const { isNullOrEmpty, isValidUrl } = require("../utils/validators");

// @desc      Upload authenticated user image
// @route     POST /users/me/image
// @access    Private
module.exports.uploadAuthenticatedUserImage = asyncHandler(
	async (request, response, next) => {
		let imageToUpload = {};
		let imageFileName;
		let imageExtension;
		const generatedToken = v4();

		const busboy = new BusBoy({ headers: request.headers });

		busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
			if (
				mimetype !== "image/jpeg" &&
				mimetype !== "image/png" &&
				mimetype !== "image/jpg"
			) {
				return next(new ErrorResponse("File type not supported", 400));
			}
			imageExtension = filename.split(".")[filename.split(".").length - 1];
			imageFileName = `${request.user.username}.${imageExtension}`;
			const filepath = path.join(os.tmpdir(), imageFileName);
			imageToUpload = { filepath, mimetype };
			file.pipe(fs.createWriteStream(filepath));
		});

		busboy.on("finish", async () => {
			await admin
				.storage()
				.bucket()
				.upload(imageToUpload.filepath, {
					resumable: false,
					metadata: {
						metadata: {
							contenType: imageToUpload.mimetype,
							firebaseStorageDownloadTokens: generatedToken,
						},
					},
				});
			const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
			await db.doc(`/users/${request.user.username}`).update({ imageUrl });
			return response.json({
				success: true,
				data: imageUrl,
			});
		});

		busboy.end(request.rawBody);
	}
);

// @desc      update authenticated user details
// @route     POST /users/me/details
// @access    Private
module.exports.updateAuthenticatedUserDetails = asyncHandler(
	async (request, response, next) => {
		const requestBody = request.body;
		const newBody = {};
		if (!isNullOrEmpty(requestBody.bio.trim())) {
			newBody.bio = requestBody.bio;
		}
		if (!isNullOrEmpty(requestBody.website.trim())) {
			if (isValidUrl(requestBody.website.trim())) {
				if (requestBody.website.trim().substring(0, 4) !== "http") {
					newBody.website = `http://${requestBody.website.trim()}`;
				} else {
					newBody.website = requestBody.website;
				}
			} else {
				return next(new ErrorResponse("Please add a valid URL", 400));
			}
		} else {
			return next(new ErrorResponse("Please add a valid URL", 400));
		}
		if (!isNullOrEmpty(requestBody.location.trim())) {
			newBody.location = requestBody.location;
		}
		await db.doc(`/users/${request.user.username}`).update(newBody);
		const userDocSnapshot = await db
			.doc(`/users/${request.user.username}`)
			.get();

		return response.status(200).json({
			success: true,
			data: {
				...userDocSnapshot.data(),
			},
		});
	}
);

// @desc      Get authenticated user details
// @route     GET /users/me/details
// @access    Private
module.exports.getAuthenticatedUserDetails = asyncHandler(
	async (request, response, next) => {
		const likes = [];
		const notifications = [];
		const facts = [];

		const userDocSnapshot = await db
			.doc(`/users/${request.user.username}`)
			.get();

		const userLikesQuerySnapshot = await db
			.collection("likes")
			.where("username", "==", request.user.username)
			.get();

		userLikesQuerySnapshot.forEach((userLikesDoc) => {
			likes.push({
				id: userLikesDoc.id,
				...userLikesDoc.data(),
			});
		});
		const notificationsQuerySnapshot = await db
			.collection("notifications")
			.where("receiver", "==", request.user.username)
			.orderBy("createdAt", "desc")
			.limit(10)
			.get();

		notificationsQuerySnapshot.forEach((notificationDoc) => {
			notifications.push({
				id: notificationDoc.id,
				...notificationDoc.data(),
			});
		});

		const factQuerySnapshot = await db
			.collection("facts")
			.where("username", "==", request.user.username)
			.orderBy("createdAt", "desc")
			.get();

		factQuerySnapshot.forEach((factDoc) => {
			facts.push({
				id: factDoc.id,
				...factDoc.data(),
			});
		});

		return response.status(200).json({
			success: true,
			data: {
				...userDocSnapshot.data(),
				likes,
				notifications,
				facts,
			},
		});
	}
);

// @desc      Get a single user
// @route     GET /users/:username
// @access    Public
module.exports.getUserDetails = asyncHandler(
	async (request, response, next) => {
		let facts = [];
		const userDocSnapshot = await db
			.doc(`/users/${request.params.username}`)
			.get();

		if (userDocSnapshot.exists) {
			const factQuerySnapshot = await db
				.collection("facts")
				.where("username", "==", request.params.username)
				.orderBy("createdAt", "desc")
				.get();

			factQuerySnapshot.forEach((factDoc) => {
				facts.push({
					id: factDoc.id,
					...factDoc.data(),
				});
			});
			return response.status(200).json({
				success: true,
				data: {
					...userDocSnapshot.data(),
					facts,
				},
			});
		} else {
			return next(new ErrorResponse("Resource not found", 404));
		}
	}
);

// @desc      Mark notifications read
// @route     POST /users/me/notifications
// @access    Private
module.exports.markNotificationsRead = asyncHandler(
	async (request, response, next) => {
		let batch = db.batch(); //update multiple docs at once
		const notificationIds = request.body;
		notificationIds.forEach((notificationId) => {
			const notificationDocRef = db.doc(`/notifications/${notificationId}`);
			batch.update(notificationDocRef, { read: true });
		});
		await batch.commit();
		return response.status(200).json({
			success: true,
			data: {},
		});
	}
);
