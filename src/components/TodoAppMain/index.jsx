import './main.css';
import React from 'react';
import TodoHeader from '../TodoHeader';
import TodoList from '../TodoList';
import TodoFooter from '../TodoFooter';

export default class TodoAppMain extends React.Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.activeTodoCount = this.activeTodoCount.bind(this);

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
          completed: true
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
    const isAllCompleted = (
      this.state.todos.length > 0 && this.activeTodoCount() === 0 ? true : false
    );

    const filter = this.state.filter;
    const todos = this.state.todos.filter(function(todo) {
      switch(filter) {
        case 'all':
          return todo;
          break;
        case 'active':
          if (!todo.completed) {
            return todo;
          }
          break;
        case 'completed':
          if (todo.completed) {
            return todo;
          }
      }
    });

    return (
      <main className="todoapp-main">
        <TodoHeader value={this.state.value}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onCompleteAll={this.completeAll}
                    checked={isAllCompleted}
                    display={this.state.todos.length > 0} />
        <TodoList todos={todos}
                  onEdit={this.editTodo}
                  onDelete={this.deleteTodo}
                  onComplete={this.completeTodo} />
        <TodoFooter todoCount={this.state.todos.length}
                    activeCount={this.activeTodoCount()}
                    onClearCompleted={this.clearCompleted}
                    onAll={this.showAll}
                    onActive={this.showActive}
                    onCompleted={this.showCompleted}
                    filter={this.state.filter} />
      </main>
    );
  }

  addTodo(todo) {
    if (todo.trim()) {
      this.setState({
        todos: this.state.todos.concat([{id: this.state.currId + 1, task: todo.trim()}]),
        currId: this.state.currId + 1
      });
    }
  }

  editTodo(id, task) {
    if (!id || !task.trim())
      return;

    const todos = this.state.todos.map(function(todo) {
      if (todo.id === id) {
        todo.task = task;
        return todo;
      }
      return todo;
    });

    this.setState({todos: todos});
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(function(todo) {
        if (todo.id !== id) {
          return todo;
        }
      })
    });
  }

  completeTodo(id, state) {
    this.toggleComplete(id, state);
    this.setState({
      todos: this.state.todos
    });
  }

  completeAll(state) {
    this.completeTodo(null, state);
  }

  clearCompleted() {
    this.setState({
      todos: this.state.todos.filter(function(todo) {
        if (!todo.completed) {
          return todo;
        }
      })
    });
  }

  showAll() {
    this.setState({filter: 'all'});
  }

  showActive() {
    this.setState({filter: 'active'});
  }

  showCompleted() {
    this.setState({filter: 'completed'});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({value: ''});
      this.addTodo(e.target.value);
    }
  }

  toggleComplete(id, state) {
    this.state.todos.forEach(function(todo) {
      if (!id || todo.id === id) {
        todo.completed = state;
      }
    });
  }

  activeTodoCount() {
    var count = 0;
    this.state.todos.forEach(function(todo) {
      if (!todo.completed) {
        count++;
      }
    });
    return count;
  }
}
