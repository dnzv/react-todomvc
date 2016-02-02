import './main.css';
import React from 'react';

export default class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div className="todo-header">
        <input type="checkbox"
               className="todo-header-check" />
        <input className="todo-header-input"
               value={this.props.value}
               placeholder="What's Next?" />
      </div>
    );
  }
}
