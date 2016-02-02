import './main.css';
import React from 'react';
import TodoHeader from '../TodoHeader';

export default class TodoAppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          task: "Complete todo app",
          completed: true
        },
        {
          id: 2,
          task: "Move to local",
          completed: false
        },
        {
          id: 3,
          task: "Integrate flux",
          completed: false
        },
        {
          id: 4,
          task: "Personalize",
          completed: false
        },
        {
          id: 5,
          task: "Add proper id",
          completed: false
        },
        {
          id: 6,
          task: "Integrate localStorage",
          completed: false
        },
        {
          id: 7,
          task: "Push to GitHub",
          completed: false
        }
      ],
      currId: 7,
      value: '',
      filter: 'all'
    };
  }

  render() {
    return (
      <main className="todoapp-main">
        <TodoHeader value={this.state.value} />
      </main>
    );
  }
}
