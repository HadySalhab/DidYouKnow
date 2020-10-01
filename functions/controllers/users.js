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

module.exports.uploadImage = asyncHandler(async (request, response, next) => {
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
		const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
		await db.doc(`/users/${request.user.username}`).update({ imageUrl });
		return response.json({
			success: true,
			data: imageUrl,
		});
	});

	busboy.end(request.rawBody);
});
