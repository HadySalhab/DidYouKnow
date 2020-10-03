import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authUserReducer from "./reducers/authUserReducer";
import factsReducer from "./reducers/factsReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
	authUser: authUserReducer,
	facts: factsReducer,
});

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
