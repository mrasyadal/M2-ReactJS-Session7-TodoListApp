import { combineReducers } from "redux";
import todo from "./todo"; // todo ini menerima export dari todo.js berupa fungsi `reducer` dari code `export default reducer` di file tsb

export default combineReducers({
	todo,
});

// combineReducers menerima object (reducers adalah function yg mengubah state dengan inputan action object bernama `todo` yang merupakan function juga)
