import './main.css';
import React from 'react';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
    this.renderTodo = this.renderTodo.bind(this);
    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);

    this.state = {
      editing: false
    }
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderTodo();
  }

  renderEdit() {
    return (
      <input className="todo-input" type="text"
             autoFocus={true}
             defaultValue={this.props.task}
             onBlur={this.finishEdit}
             onKeyUp={this.checkEnter} />
    );
  }

  renderTodo() {
    const completed = this.props.completed;
    const textStyle = (completed ? 'line-through' : 'none');
    const textColor = (completed ? '#ccc' : 'inherit');

    const todoDisplaySpanStyle = {
      textDecoration: textStyle,
      color: textColor
    };

    return (
      <div className="todo-display">
        <input className="todo-check" type="checkbox" checked={completed} onChange={this.toggleComplete} />
        <div onDoubleClick={this.edit}>
          <span style={todoDisplaySpanStyle}>{this.props.task}</span>
        </div>
        <button className="todo-delete" onClick={this.props.onDelete}></button>
      </div>
    );
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const value = e.target.value;

    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
      this.setState({
        editing: false
      });
    }
  }

  toggleComplete(e) {
    if (e.target.checked) {
      this.props.onComplete(true);
    } else {
      this.props.onComplete(false);
    }
  }
}
