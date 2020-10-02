import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Pages

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={LoginPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
