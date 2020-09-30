const firebase = require("firebase");
exports.signup = async (request, response) => {
	try {
		const requestBody = request.body;
		const newUser = {
			email: requestBody.email,
			password: requestBody.password,
			confirmPassword: requestBody.confirmPassword,
			fullName: requestBody.fullName,
		};
		const userCredential = await firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password);
		return response.status(201).json({
			success: true,
			data: {
				id: userCredential.user.uid,
				email: newUser.email,
				fullName: newUser.fullName,
			},
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
