// file ini adalah pembahasan materi M2S7C2-M2S7C5

import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../components/todoitem"; // nama variable/alias tidak harus sama dengan nama file, cuma nama yang sama akan memudahkan mengingat kode
import TodoItemF from "../components/todoitemF";
import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
// import 3 hal di bawah ada di video M2S7C7 di bagian awal tentang memindahkan action creator ke file terpisah
import {
	changeTodoCount,
	incrementTodoCount,
	decrementTodoCount,
	fetchTodoGlobal,
} from "../redux/actions/todo";

// Class component
class TodoPage extends React.Component {
	// menginisiasi `state` di react
	// yakni variabel yang dapat menampung berbagai macam data
	state = {
		namaKu: "Rasyad",
		// tipe data object
		user: {
			username: "Junuudun",
			email: "Rasyad007@gmail.com",
		},

		// tipe data array
		buah: [`Nangka`, `Mangga`, `Durian`],
		todoList: [],
		todoInput: "",
	};

	// fungsi fetchTodo dijadikan comment di M2S7C7: Redux Thunk
	// Materi M2S7C4: axios and JSON server
	// fetchTodo = () => {
	// 	// Axios ini adalah asynchronous function di JS
	// 	Axios.get("http://localhost:2000/todo").then((response) => {
	// 		// mengambil data di localhost:2000/todo dan menyimpan SELURUH data tersebut di variable `response`
	// 		// kita bisa simpan data ini di `state` class component `App` kita
	// 		// console.log(response.data);
	// 		// alert(`fetchTodo ambil data`);
	// 		this.setState({ todoList: response.data });
	// 		// `setState` di atas akan memanggil render() parent component di lifecycle method `update`
	// 		// this.setState akan mengubah `local state` yaitu `todoList`
	// 		this.props.changeTodo(response.data.length);
	// 		// this.props.changeTodo akan mengubah `global state` yaitu `todoCount` di file todo.js
	// 	});
	// };

	// gantiNamaKu = () => {
	// 	this.setState({ namaKu: "Arkan" });
	// };

	// Materi M2S7C3: State and properties
	// menambah info di state.todoList
	addTodo = () => {
		this.setState({
			todoList: [
				...this.state.todoList,
				{
					activity: "Tidur",
					id: 4,
				},
			],
		});
	};

	// Materi M2S7C3: State and properties
	addTodoNew = () => {
		// cara memakai Axios untuk menambah kegiatan `todo` ke dalam json-server
		// Axios.post(<url>, <data yg ingin disimpan dalam bentuk yg sesuai dgn database>).then(() => <aksi ketika berhasil post>)
		Axios.post("http://localhost:2000/todo", {
			activity: this.state.todoInput,
			status: "Completed",
		}).then(() => {
			this.props.fetchTodoGlobal();
		});
		// ga ditambahin `id` karena Axios.post akan menambah `id` sendiri dengan nilai unik

		// cara di bawah adalah cara sebelum kenal axios dan database:
		// this.setState({
		// 	// .setState menerima object untuk digunakan dalam mengubah `state` class component
		// 	todoList: [
		// 		...this.state.todoList,
		// 		{
		// 			activity: this.state.todoInput,
		// 			id: this.state.todoList.length + 1,
		// 		},
		// 	],
		// });
	};

	// Materi M2S7C4: axios and JSON server
	deleteTodo = (id) => {
		// Pakai axios untuk mendelete data dengan `id` tertentu di json
		Axios.delete(`http://localhost:2000/todo/${id}`) // jadinya "http://localhost:2000/todo/id
			.then(() => {
				alert(`Berhasil delete todo!`);
				this.props.fetchTodoGlobal();
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});

		// cara di bawah adalah cara sebelum kenal axios dan database:
		// this.setState({
		// 	todoList: this.state.todoList.filter((val) => {
		// 		// method .filter() membutuhkan callback function yang mereturn nilai boolean
		// 		return val.id !== id;
		// 	}),
		// });
	};

	// Materi M2S7C4: axios and JSON server
	completeTodo = (id) => {
		Axios.patch(`http://localhost:2000/todo/${id}`, {
			status: "Finished",
		})
			.then(() => {
				this.props.fetchTodoGlobal();
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});
	};

	// Materi M2S7C5: Lifecycle Methods
	// Dijalankan ketika method render() berjalan
	componentDidMount = () => {
		// bisa naro kode apapun
		// alert(`componentDidMount`);
		this.props.fetchTodoGlobal();
	};

	// Materi M2S7C5: Lifecycle Methods
	// Dijalankan ketika method inputHandler() dan yang semisal (menggunakan `setState`) berjalan
	componentDidUpdate = () => {
		// alert(`componentDidUpdate`);
		// bisa naruh kode apapun selain .setState() agar tidak infinite loop
	};

	// Materi M2S7C5: Lifecycle Methods
	// Dijalankan ketika method deleteTodo() dan yg semisal (menggunakan `Axios.delete`) berjalan
	componentWillUnmount = () => {};

	inputHandler = (event) => {
		this.setState({ todoInput: event.target.value });
		// event.target.value adalah nama variable untuk mengambil `value` event yang dihandle oleh input text
	};

	renderTodoList = () => {
		// alert(`renderTodoList`);
		return this.props.todoGlobalState.todoList.map((val) => {
			// this.state.todoList.map di line bawah diganti menjadi this.props.todoGlobalState.map di M2S2C7: Redux Thunk
			// return this.state.todoList.map((val) => {
			// alert(`Masuk ke TodoItem + ${val}`);
			return (
				<TodoItem
					todoData={val}
					deleteTodoHandler={this.deleteTodo}
					completeTodoHandler={this.completeTodo}
				/>
			);
			// nama props yang digunakan adalah todoData dan todoData digunakan untuk merefer props di child component
		});
	};

	// M2S7C2: Components = buat class dgn bootstrap dan jsx
	render() {
		// alert(`render parent component`);
		return (
			<div className="container mx-3">
				<h1>Todo List</h1>

				{/* mengambil data dari json server di localhost:2000 dengan axios menggunakan internal method `fetchTodo` */}
				<button onClick={this.fetchTodo} className="btn btn-primary mx-3">
					Get Todo of {this.props.todoGlobalState.todoCount} item(s)
					{/* todoGlobalState dideklarasikan di function mapStateToProps */}
					{/* ini adalah contoh mengambil Global State dari komponen lain tanpa pakai props karena props hanya bisa dr parent ke child saja */}
				</button>
				<br></br>

				{/* <h1>{this.state.namaKu}</h1> */}

				{/* contoh button yang menambah property object di dalam state*/}
				{/* <button className="btn btn-secondary" onClick={this.addTodo}>
					Tambah Kegiatan
				</button> */}

				{/* cara yang lebih baik: menggunakan method di dalam class App bernama renderTodoList */}
				{this.renderTodoList()}

				{/* ini contoh button yang memanggil fungsi yang memiliki method .setState()
				<button className="btn btn-primary" onClick={this.gantiNamaKu}>
					Ganti 'state.namaKu'
				</button> */}

				{/* membuat button yang dapat menambah property state berdasarkan input dari user */}
				{/* Apapun yang dimasukkan ke dalam teks input, method this.inputHandler() akan mengambil input dan menyimpan parameter tersebut ke dalam state.todoInput */}
				<input
					type="text"
					className="mx-3 my-3"
					placeholder="Tambahan kegiatan"
					onChange={this.inputHandler}></input>

				<button onClick={this.addTodoNew} className="btn btn-secondary">
					Add Todo
				</button>

				<button
					className="btn btn-info mx-3"
					onClick={this.props.incrementTodo}>
					Increment Todo
				</button>
				<button className="btn btn-warning" onClick={this.props.decrementTodo}>
					Decrement Todo
				</button>
				<br></br>

				<input
					type="text"
					className="mx-3 m"
					placeholder="Number of New Todo"
					onChange={this.inputHandler}></input>

				<button
					onClick={() => this.props.changeTodo(this.state.todoInput)}
					className="btn btn-primary">
					Change Todo
				</button>

				{/* Ini contoh menggunakan class component dengan mengirim nilai variable `val` sebagai props */}
				{/* Bandingkan dengan comment di bawah yang mengirim `todoData={{activity:"", id:""}}` */}
				{/* {this.state.todoList.map((val) => {
					return <TodoItem todoData={val} />;
					// nama props yang digunakan adalah todoData karena todoData digunakan untuk merefer ke props di child component
				})} 
				---> cara ini bagus tapi `cluttering the workspace`. Cara yang lebih baik adalah menggunakan method */}
				{/* contoh mencetak sesuatu di dalam state
				<ol>
					{ kita ingin mencetak nama-nama buah di dalam array buah di dalam state }
					{
						// method map mengembalikan array berisi nilai function callback
						this.state.buah.map((value) => {
							return <li>{value}</li>;
						})
					}
				</ol> */}
			</div>
		);
	}
}

// Function component
// function App() {
// 	return (
// 		<div>
// 			<h1>Todo List</h1>
// 			{/* M2S7C2: Components = buat class dgn bootstrap dan jsx */}
// 			TodoItem adalah nama class di file bernama todoitem.jsx
// 			{/* <TodoItem />
// 			<TodoItem />
// 			<TodoItemF /> */}

// 			{/* M2S7C3: State and Properties */}
// 			{/* Props yg dikirim (`{kegiatan}`) bisa berupa data structure apa aja e.g. array, object, number, string, boolean */}
// 			{/* props bisa lebih dr 1, e.g.
// 			<TodoItem todoActivity={kegiatan} todoActivityID={1} /> */}
// 			{/* atau pakai object e.g.
// 			<TodoItem todoData={{ activity: "Makan", id: 1 }} />
// 			<TodoItem todoData={{ activity: "Shalat", id: 2 }} />
// 			<TodoItem todoData={{ activity: "Coding", id: 3 }} /> */}

// 			{/* contoh di atas adalah contoh class component, contoh di bawah adalah contoh functional component */}
// 			{/* <TodoItemF todoData={{ activity: "Makan", id: 1 }} />
// 			<TodoItemF todoData={{ activity: "Shalat", id: 2 }} />
// 			<TodoItemF todoData={{ activity: "Coding", id: 3 }} /> */}

// 		</div>
// 	);
// }

// Materi M2S7C6: Redux, Reducers, dan Action
// Mengambil state dr store/reducer: menampilkan todoCount di TodoPage
// Setelah mengimpor { connect } dari `react-redux`
const mapStateToProps = (state) => {
	// parameter `state` di atas menyimpan semua nilai global state di seluruh komponen
	// isinya adalah reducers yang dimasukkan ke dalam fungsi `combineReducers` di index.js di /reducers/index.js
	// contoh isinya:
	// state.todo.todoCount yang mereturn angka 0

	return {
		todoGlobalState: state.todo,
		// mengambil `todo` di state di atas dari fungsi `combineReducers`
		// `todo` merupakan object yang memiliki bbrp isi seperti `todoList`,`todoCount` etc
	};
	// Function ini mereturn object
	// Field / property yang ada di dalam object tersebut akan menjadi props di dalam component TodoPage
	// Misal return { testingProps: 0 }. Kita bisa panggil property ini menjadi props dengan kode `this.props.testingProps` dan akan mengembalikan nilai 0
};

//
// Mengubah state di store/reducer dari salah satu component: mengubah data todo.todoCount dari TodoPage
// `incrementTodoCount` adalah action object
// Ingat: action object (obj yang akan mengubah isi state reducers) harus memiliki field `type`
// Tahapan ada di catatan hal 98 bawah

// 3 function di bawah dinamakan action creator. sejak M2S7C7 functions ini dipindahkan ke file todo.js di /redux/actions
// const incrementTodoCount = () => {
// 	return {
// 		type: "INCREMENT_TODO_COUNT",
// 	};
// };

// const decrementTodoCount = () => {
// 	return {
// 		type: "DECREMENT_TODO_COUNT",
// 	};
// };

// const changeTodoCount = (newCount) => {
// 	return {
// 		type: "CHANGE_TODO_COUNT",
// 		payload: newCount,
// 		// umum menggunakan fieldName = `type` dan `payload`
// 	};
// };

// mapDispatchToProps adalah object berisi action object di atas yang akan dijadikan argument/parameter untuk fungsi connect di bawah
// fungsi ini men-dispatch action object ke reducer dan membuat action object menjadi props
const mapDispatchToProps = {
	incrementTodo: incrementTodoCount,
	decrementTodo: decrementTodoCount,
	changeTodo: changeTodoCount,
	fetchTodoGlobal,
	// incrementTodoCount adalah action object di atas
};

// Materi M2S7C6: Redux, Reducers dan Action
export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
// export default `connect` ada agar kita bisa mengakses object yang direturn oleh fungsi mapStateToProps sebagai props dari component yg dihubungkan (dalam hal ini: TodoPage)
// TodoPage adalah parameter untuk fungsi inherent yang ada di `connect`

// Materi M2S7C2-M2S7C5
// export default TodoPage;
