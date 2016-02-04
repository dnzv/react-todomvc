import Dispather from '../dispatcher';
import actionTypes from '../constants/actionTypes';

export default {
  create(todo) {
    console.log("ACTION: create todo", todo);
    Dispather.dispatch({
      type: actionTypes.CREATE_TODO,
      data: todo
    });
  },

  update(updatedTodo) {
    console.log("ACTION: update todo", updatedTodo);
    Dispather.dispatch({
      type: actionTypes.UPDATE_TODO,
      data: updatedTodo
    });
  },

  delete(id) {
    console.log("ACTION: delete todo", id);
    Dispather.dispatch({
      type: actionTypes.DELETE_TODO,
      data: id
    });
  }
}
