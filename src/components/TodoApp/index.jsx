import './main.css';
import React from 'react';
import TodoAppMain from '../TodoAppMain';

export default class TodoApp extends React.Component {
  render() {
    return (
      <div className="todoapp-container">
        <header>
          <h1 className="todoapp-h1">todos</h1>
        </header>
        <TodoAppMain />
        <footer className="todoapp-footer">
          <div className="todoapp-footer-info">
            <span>Double-click to edit a todo</span>
            <br/>
            <span>Created by <a href="#">Deniz Vahaboglu</a> using <a href="https://facebook.github.io/react/index.html">React</a></span>
            <br/>
            <span>Replicated from <a href="http://todomvc.com">TodoMVC</a></span>
          </div>
        </footer>
      </div>
    );
  }
}
