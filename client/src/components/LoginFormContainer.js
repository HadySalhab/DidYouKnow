import React, { useEffect } from "react";
// Components
import LoginForm from "./LoginForm";
// Hooks
import useAuthReducer from "../hooks/useAuthReducer";
// Util
import {
	validateLoginFormAndReturn,
	getErrorMessageFromError,
} from "../utils/functions";
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const LoginFormContainer = ({ loginUser, isAuthenticated, history }) => {
	const {
		email,
		password,
		loading,
		error,
		setEmail,
		setPassword,
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
		const formData = { email, password };
		let error = validateLoginFormAndReturn(formData);
		if (!_.isEmpty(error)) {
			setError(error);
		} else {
			setLoading();
			try {
				await loginUser(formData);
			} catch (loginError) {
				error.loginError = getErrorMessageFromError(loginError);
				setError(error);
			}
		}
	};

	return (
		<LoginForm
			email={email}
			password={password}
			loading={loading}
			error={error}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onSubmit={onSubmit}
		/>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authUser.isAuthenticated,
});
const mapActionsToProps = {
	loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(LoginFormContainer);
