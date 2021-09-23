import Axios from "axios";

export const incrementTodoCount = () => {
	return {
		type: "INCREMENT_TODO_COUNT",
	};
};

export const decrementTodoCount = () => {
	return {
		type: "DECREMENT_TODO_COUNT",
	};
};
export const changeTodoCount = (newCount) => {
	return {
		type: "CHANGE_TODO_COUNT",
		payload: newCount,
		// umum menggunakan fieldName = `type` dan `payload`
	};
};

export const fetchTodoGlobal = () => {
	return (dispatch) => {
		Axios.get("http://localhost:2000/todo")
			.then((response) => {
				// mendapatkan response.data untuk kemudian dioper ke global state
				dispatch({
					type: "GET_TODO",
					payload: response.data,
				});

				dispatch({
					type: "CHANGE_TODO_COUNT",
					payload: response.data.length,
				});
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});
	};
};

// cuma boleh ada 1 `export default` di 1 page/file
