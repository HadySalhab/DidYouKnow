import React from "react";
// Components
import LoginForm from "./LoginForm";
// Hooks
import useAuthReducer from "../hooks/useAuthReducer";
// Util
import { validateLoginFormAndReturn } from "../utils/functions";
import _ from "lodash";

const LoginContainer = () => {
	const {
		email,
		password,
		loading,
		error,
		setEmail,
		setPassword,
		setLoading,
		setError,
		setReset,
	} = useAuthReducer();

	const onSubmit = () => {
		let error = validateLoginFormAndReturn({ email, password });
		if (!_.isEmpty(error)) {
			setError(error);
		} else {
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

export default LoginContainer;
