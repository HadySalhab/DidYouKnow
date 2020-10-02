export const useInputSetter = (fn) => (e) => {
	const { target } = e;
	const { value } = target;
	fn(value);
};
