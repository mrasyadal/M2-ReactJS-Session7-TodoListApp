import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/index";
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// `createStore` adalah sebuah function dengan `rootReducer` sebagai parameter
// createStore adalah function yang diperoleh dari `redux`
// rootReducer adalah object yg diambil dari hasil export `combineReducers` di reducers/index.js
// `combineReducers` merupakan kumpulan reducers (dalam bentuk object) yang berbeda-beda dari setiap cabang component

ReactDOM.render(
	<Provider store={store}>
		{/* `store` di sebelah kiri persamaan adalah props, `store` di sebelah kanan adalah store dari const store */}
		<App />
	</Provider>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
