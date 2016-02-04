import Dispather from '../dispatcher';
import actionTypes from '../constants/actionTypes';

export default {
  create(todo) {
    Dispather.dispatch({
      type: actionTypes.CREATE_TODO,
      data: todo
    });
  },

  update(updatedTodo) {
    Dispather.dispatch({
      type: actionTypes.UPDATE_TODO,
      data: updatedTodo
    });
  },

  delete(id) {
    Dispather.dispatch({
      type: actionTypes.DELETE_TODO,
      data: id
    });
  }
}
