import React from "react";
import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoPage from "./pages/TodoPage";
import MyNavbar from "./components/MyNavbar";
import { connect } from "react-redux";
// import connect berfungsi untuk menghubungkan komponen, dalam hal ini: MyNavbar dan TodoPage

class App extends React.Component {
	render() {
		return (
			<div>
				<MyNavbar />
				<TodoPage />
			</div>
		);
	}
}

export default App;
