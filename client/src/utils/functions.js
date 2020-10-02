export const useInputSetter = (fn) => (e) => {
	const { target } = e;
	const { value } = target;
	fn(value);
};

export const isNullOrEmpty = (string) =>
	string === null || string === undefined || string.trim() === "";
export const isEmail = (email) =>
	email.match(
		/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/
	)
		? true
		: false;

export const isValidUrl = (website) =>
	website.match(
		/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
	)
		? true
		: false;

export const validateLoginFormAndReturn = (formData) => {
	const { email, password } = formData;
	let error = {};
	if (isNullOrEmpty(email.trim())) {
		error.email = "Please provide an email";
	} else if (!isEmail(email)) {
		error.email = "Please add a valid email";
	}
	if (isNullOrEmpty(password.trim())) {
		error.password = "Please add your password";
	}
	return error;
};

export const validateSignupFormAndReturn = (formData) => {
	const { username, email, password, confirmPassword } = formData;
	let error = {};

	if (isNullOrEmpty(username.trim())) {
		error.username = "Please provide a username";
	}
	if (isNullOrEmpty(email.trim())) {
		error.email = "Please provide an email";
	} else if (!isEmail(email)) {
		error.email = "Please add a valid email";
	}
	if (isNullOrEmpty(password.trim())) {
		error.password = "Please add your password";
	}
	if (confirmPassword !== password) {
		error.confirmPassword = "Passwords must match ";
	}
	return error;
};

//https://github.com/axios/axios#handling-errors
export const getErrorMessageFromError = (error) => {
	if (navigator.onLine) {
		if (error.response) {
			if (!error.response.data.message) {
				return error.response.statusText;
			}
			return error.response.data.message;
		} else if (error.request) {
			return `Something Went Wrong. Please Try Again!`;
		} else if (error.message) {
			return `Error: ${error.message}`;
		} else {
			return "Unknown Error.";
		}
	} else {
		return "Please check network connection";
	}
};
