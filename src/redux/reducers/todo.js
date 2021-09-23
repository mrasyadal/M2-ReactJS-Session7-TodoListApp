// file ini bertindak sebagai reducer (function pengubah state) untuk todo
// file ini merupakan file dasar pembuatan reducer
// alur pembuatan reducer:
// 1. Ada fungsi`const reducer` yang memiliki nilai return dan akan diekspor di file ini
// 2. Hasil ekspor dari component yang berbeda-beda dikumpuulkan di reducers/index.js dgn menggunakan fungsi `combineReducers`
// 3.a `combineReducers`/gabungan beberapa reducers diekspor ke file src/index.js untuk disimpan di dalam `store`
// 3.b store ini yang akan mengubah nilai global state di dalam aplikasi
// 4.a Agar `store` dapat digunakan oleh aplikasi, komponen bernama 'Provider' perlu diimpor dari `react-redux`
// 4.b Penggunaan `Provider` ada di file src/index.js

const init_state = {
	// initialize state kita sebagai nilai default
	// isi `init_state` sama seperti yang ada di file TodoPage.jsx (ada todoList, inputTodo)

	todoList: [],
	inputTodo: "",
	todoCount: 0,
};

// definisi reducer: Function yang menerima action object (disimpan di parameter `action`) dan mengubah state
// fungsi connect di ./src/pages/TodoPage.jsx akan 'mengumpankan' mapDispatchToProps sebagai action object di fungsi ini
const reducer = (state = init_state, action) => {
	// argument state adalah global state yg ingin diubah
	// argument action digunakan untuk menampung semua action object (berdasarkan gambar Redux Flow di catatan)
	// action object memiliki field bernama `type`
	// `type` di
	switch (action.type) {
		case "INCREMENT_TODO_COUNT":
			return { ...state, todoCount: state.todoCount + 1 };
		// copy dulu isi state yang ada, baru ganti data sesuai kebutuhan
		// cara baca: sekarang ini, property `todoCount` di global state ini memiliki nilai sama dengan `state.todoCount` (nilai yg ada sekarang) ditambah dengan 1
		case "DECREMENT_TODO_COUNT":
			return { ...state, todoCount: state.todoCount - 1 };
		case "CHANGE_TODO_COUNT":
			return { ...state, todoCount: action.payload };
		case "GET_TODO":
			return { ...state, todoList: action.payload };
		default:
			return state;
		// kalau ga ada `type` yang diinginkan, kembalikan `global state` apa adanya
	}

	// fungsi mereturn sebuah state baru sebagai state global kita
};

export default reducer;
// line export di atas bisa dipersingkat menjadi
// export default (state = init_state, action) => { return state; };
