import './main.css';
import React from 'react';
import Todo from '../Todo';

export default class TodoList extends React.Component {
  render() {
    const todos = this.props.todos;
    const onEdit = this.props.onEdit;
    const onDelete = this.props.onDelete;
    const onComplete = this.props.onComplete;

    return (
      <ul className="todo-list">
        {todos.map(function(todo) {
          return (
            <li key={todo.id}>
              <Todo task={todo.task}
                    completed={todo.completed}
                    onEdit={onEdit.bind(null, todo.id)}
                    onDelete={onDelete.bind(null, todo.id)}
                    onComplete={onComplete.bind(null, todo.id)} />
            </li>
          );
        })}
      </ul>
    );
  }
}
