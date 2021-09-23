import React from "react";
import { connect } from "react-redux";

class Navbar extends React.Component {
	render() {
		return (
			<div className="d-flex flex-row justify-content-between bg-dark p-3 text-white align-items center">
				<h5>Todo List App</h5>
				<h5>You have {this.props.todoGlobalState.todoCount} Todo Item(s)</h5>
			</div>
		);
	}
}

// export default Navbar;

// Materi M2S7C6: Redux, Reducers dan Action
const mapStateToProps = (state) => {
	return {
		todoGlobalState: state.todo,
	};
};
// function mapStatetoProps mereturn object

export default connect(mapStateToProps)(Navbar);
// connect(<object 1>, <object 2>,...)(<class name>)
