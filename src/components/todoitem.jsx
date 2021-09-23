import React from "react";
// import react ini berguna untuk menyimpan "react" di dalam variable `React`
// `react` adalah nama folder di node_modules
// file ini adalah class component

// ada class bernama React.Component di variabel React yang sudah diimpor di atas
class TodoItem extends React.Component {
	// di dalam class TodoItem, ada 2 benda: complete dan delete.
	// agar keduanya berfungsi, keduanya perlu dijadikan method di dalam class TodoItem

	// ini method delete tanpa parameter
	deleteBtnHandler() {
		alert(`Anda memencet tombol Delete`);
	}

	// ini method untuk ngehandle semau tipe button click (dengan parameter)
	btnHandler(type) {
		alert(`Anda memencet button ${type}`);
	}

	render() {
		// render berguna untuk menampilkan/merender item
		// alert(`Render child component`);
		return (
			<div className="d-flex flex-row justify-content-between todo-item-container align-items-center mx-3">
				{/* Ini tambahan di M2S7C3, ada props */}
				{this.props.todoData.activity}, ID: {this.props.todoData.id}
				<div>
					{/* cara memanggil function delete: <user action>=this.{<nama function>} */}
					{/* ada `this` karena function yg dipanggil ada di dalam class itu sendiri */}
					{/* nama function tidak disertai dengan `()` agar function tsb tidak auto-execute */}

					{/* agar btnHandler dapat memakai parameter, pakai 1 arrow function kosong*/}

					<button
						className="btn btn-success mx-2 my-2"
						onClick={() =>
							this.props.completeTodoHandler(this.props.todoData.id)
						}
						disabled={this.props.todoData.status === "Finished"}>
						{/* disabled menerima nilai boolean. Apabila boolean == true => button is disabled */}
						{this.props.todoData.status}
					</button>

					<button
						className="btn btn-danger"
						onClick={() =>
							this.props.deleteTodoHandler(this.props.todoData.id)
						}>
						Delete
					</button>

					{/* di dalam .jsx kita ga bisa pakai if biasa, hanya bisa pakai if ternary */}
					{/* if (condition) ? <if true> : <if false> */}
				</div>
			</div>
		);
	}
}

// ini adalah class component

export default TodoItem;
