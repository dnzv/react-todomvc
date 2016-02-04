import './main.css';
import React from 'react';

export default class TodoHeader extends React.Component {
  render() {
    const display = (this.props.display ? 'block' : 'none');

    return (
      <div className="todo-header">
        <input type="checkbox"
               className="todo-header-check"
               checked={this.props.checked}
               onClick={this.toggleComplete}
               style={{display: display}} />
        <input className="todo-header-input"
               value={this.props.value}
               placeholder="What's Next?"
               onKeyUp={this.props.onKeyUp}
               onChange={this.props.onChange} />
      </div>
    );
  }

  toggleComplete = (e) => {
    if (e.target.checked) {
      this.props.onCompleteAll(true);
    } else {
      this.props.onCompleteAll(false);
    }
  };
}
