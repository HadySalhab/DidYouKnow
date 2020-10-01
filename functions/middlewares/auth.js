const admin = require("firebase-admin");

const db = admin.firestore();
exports.protect = async (request, response, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return response.status(401).json({
				success: false,
				message: "Not authorized, please login again",
			});
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		const authID = decodedToken.uid;
		const userRef = await db
			.collection("users")
			.where("authID", "==", authID)
			.limit(1)
			.get();
		const user = userRef.docs[0].data();
		req.user = user;
		return next();
	} catch (error) {
		if (error.code.startsWith("auth/")) {
			return response.status(401).json({
				success: false,
				message: error.message,
			});
		} else {
			return response.status(500).json({
				success: false,
				message: "Internal Server Error",
			});
		}
	}
};
