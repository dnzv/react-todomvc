import './main.css';
import React from 'react';
import TodoHeader from '../TodoHeader';
import TodoList from '../TodoList';
import TodoFooter from '../TodoFooter';
import TodoActions from '../../actions/todoActions';
import TodoStore from '../../stores/todoStore';

export default class TodoAppMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: TodoStore.getAllTodos(),
      value: '',
      filter: 'all'
    };
  }

  componentWillMount() {
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  render() {
    const count = this.state.todos.length;
    const activeCount = this._activeTodoCount();
    const isAllCompleted = count > 0 && activeCount === 0 ? true : false;

    const filter = this.state.filter;
    const todos = this.state.todos.filter((todo) => {
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
                    display={count > 0} />
        <TodoList todos={todos}
                  onEdit={this.editTodo}
                  onDelete={this.deleteTodo}
                  onComplete={this.completeTodo} />
        <TodoFooter todoCount={count}
                    activeCount={activeCount}
                    onClearCompleted={this.clearCompleted}
                    onAll={this.showAll}
                    onActive={this.showActive}
                    onCompleted={this.showCompleted}
                    filter={this.state.filter} />
      </main>
    );
  }

  addTodo = (todo) => {
    if (todo.trim()) {
      TodoActions.create({title: todo.trim()});
    }
  };

  editTodo = (id, title) => {
    if (!id || !title.trim())
      return;
    TodoActions.update({id, title});
  };

  deleteTodo = (id) => {
    TodoActions.delete(id);
  };

  completeTodo = (id, state) => {
    TodoActions.update({id, completed: state});
  };

  completeAll = (state) => {
    this.completeTodo(null, state);
  };

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(function(todo) {
        if (!todo.completed) {
          return todo;
        }
      })
    });
  };

  showAll = () => {
    this.setState({filter: 'all'});
  };

  showActive = () => {
    this.setState({filter: 'active'});
  };

  showCompleted = () => {
    this.setState({filter: 'completed'});
  };

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({value: ''});
      this.addTodo(e.target.value);
    }
  };

  _activeTodoCount() {
    var count = 0;
    this.state.todos.forEach(function(todo) {
      if (!todo.completed) {
        count++;
      }
    });
    return count;
  }

  onChange = () => {
    this.setState({
      todos: TodoStore.getAllTodos()
    });
  };
}
