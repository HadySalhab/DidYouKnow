export const useInputSetter = (fn) => (e) => {
	const { target } = e;
	const { value } = target;
	fn(value);
};

export const isNullOrEmpty = (string) =>
	string === null || string === undefined || string.trim() === "";
export const isEmail = (email) =>
	email.match(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
		? true
		: false;

export const isValidUrl = (website) =>
	website.match(
		/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
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
