import React from "react";
// ini adalah todoitem dengan function menggunakan bahasa jsx
// jsx membawa syntax dan support bahasa HTML ke JS
// file ini adalah function component

const TodoItemF = (props) => {
	const btnHandler = (type) => {
		alert(`Anda memencet button ${type}`);
	};

	return (
		<div className="d-flex flex-row justify-content-between todo-item-container align-items-center">
			{props.todoData.activity}, id: {props.todoData.id}
			<div>
				{/* di function component, tidak perlu menggunakan `this` ketika memanggil function internal */}
				<button
					className="btn btn-success"
					onClick={() => btnHandler(`Complete`)}>
					Complete
				</button>
				<button className="btn btn-danger" onClick={() => btnHandler(`Delete`)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoItemF;

// step-by-step
// 1. import `react`
// 2. buat function yang mereturn jsx
// 3.
