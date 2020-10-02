import React, { useEffect } from "react";
// Components
import SignupForm from "./SignupForm";
// Hooks
import useAuthReducer from "../hooks/useAuthReducer";
// Util
import {
	validateSignupFormAndReturn,
	getErrorMessageFromError,
} from "../utils/functions";
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const SignupFormContainer = ({ signupUser, isAuthenticated, history }) => {
	const {
		username,
		email,
		password,
		confirmPassword,
		loading,
		error,
		setUsername,
		setEmail,
		setPassword,
		setConfirmPassword,
		setLoading,
		setError,
	} = useAuthReducer();

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

	const onSubmit = async () => {
		const formData = { username, email, password, confirmPassword };
		let error = validateSignupFormAndReturn(formData);
		if (!_.isEmpty(error)) {
			setError(error);
		} else {
			setLoading();
			try {
				await signupUser(formData);
			} catch (signupError) {
				error.signupError = getErrorMessageFromError(signupError);
				setError(error);
			}
		}
	};

	return (
		<SignupForm
			username={username}
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			loading={loading}
			error={error}
			onUsernameChange={setUsername}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onConfirmPasswordChange={setConfirmPassword}
			onSubmit={onSubmit}
		/>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authUser.isAuthenticated,
});
const mapActionsToProps = {
	signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignupFormContainer);
