import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from './reducers';

//for testing POST method
//adding this library allow us to directly access to axios
import axios from 'axios';
window.axios = axios;


// first parameter: reducer
const store = createStore( reducers,{}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	document.querySelector("#root")
);
