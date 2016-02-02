import './main.css';
import React from 'react';

export default class TodoAppMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const filter = this.props.filter;
    const todoCount = this.props.todoCount || 0;
    const activeCount = this.props.activeCount || 0;

    const footerDisplay = (todoCount > 0 ? 'flex' : 'none');
    const todoFooterStyle = {
      display: footerDisplay
    };

    const clearVisibility = (activeCount < todoCount ? 'visible': 'hidden');
    const footerClearStyle = {
      visibility: clearVisibility
    };

    var countText = " items left";
    if (activeCount === 1) {
      countText = " item left";
    }

    var all, active, completed;
    switch(filter) {
      case 'all':
        all = {borderColor: '#cc9a9a'};
        break;
      case 'active':
        active = {borderColor: '#cc9a9a'};
        break;
      case 'completed':
        completed = {borderColor: '#cc9a9a'};
        break;
      default: // no op
    }

    return (
      <div className="todo-footer" style={todoFooterStyle}>
        <div className="footer-count">
          <span>{activeCount + countText}</span>
        </div>
        <div className="todo-footer-filters">
          <ul>
            <li style={all} onClick={this.props.onAll}>All</li>
            <li style={active} onClick={this.props.onActive}>Active</li>
            <li style={completed} onClick={this.props.onCompleted}>Completed</li>
          </ul>
        </div>
        <div className="footer-clear" style={footerClearStyle}>
          <a className="todo-footer-clear-a" href="#"
             onClick={this.props.onClearCompleted}>Clear Completed</a>
        </div>
      </div>
    );
  }
}
