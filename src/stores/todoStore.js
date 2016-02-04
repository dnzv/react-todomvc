import Dispather from '../dispatcher';
import actionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _todos = [
  {
    id: 1,
    title: "Integrate flux",
    completed: false
  },
  {
    id: 2,
    title: "Polish",
    completed: false
  },
  {
    id: 3,
    title: "Add ID and localStorage",
    completed: false
  }
];
let _currId = 3;

class TodoStore extends EventEmitter {
  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  };

  emitChange = () => {
    this.emit(CHANGE_EVENT);
  };

  getAllTodos = () => {
    return _todos;
  };

  getCurrentId = () => {
    return _currId;
  };
};

let todoStore = new TodoStore();

Dispather.register((action) => {
  switch (action.type) {
    case actionTypes.CREATE_TODO:
      console.log(actionTypes.CREATE_TODO, action.data);
      _currId++;
      action.data.id = _currId;
      _todos.push(action.data);
      todoStore.emitChange();
      break;
    case actionTypes.UPDATE_TODO:
      console.log(actionTypes.UPDATE_TODO, action.data);
      _todos = _todos.map((todo) => {
        if (!action.data.id || todo.id === action.data.id) {
          todo.title = action.data.title ||todo.title;
          todo.completed = action.data.completed;
        }
        return todo;
      });
      todoStore.emitChange();
      break;
    case actionTypes.DELETE_TODO:
      console.log(actionTypes.DELETE_TODO, action.data);
      _todos = _todos.filter((todo) => {
        if (!action.data && !todo.completed) {
          return todo;
        } else if (action.data && todo.id !== action.data) {
          return todo;
        }
      });
      todoStore.emitChange();
      break;
    default: // no op
  }
  console.log("currId, todos", _currId, _todos);
});

export default todoStore;
