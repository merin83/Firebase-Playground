import React, { Component } from 'react';
import todoAction from './redux/todo/actions';
import AuthActions from './redux/auth/actions';
import { getAuth } from './redux/auth/selectors';
import { connect } from 'react-redux';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import { List, ListCheckbox } from 'react-toolbox/lib/list';
import Header from './components/header';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(text, value) {
    this.props.changeNewTodo(value);
  }

  handleSubmit(e) {
    this.props.saveNewTodo(this.props.newTodo);
  }

  handleCheckboxChange(todo) {
    this.props.setTodoStatus(todo.id, !todo.done);
  }

  handleEdit(todo) {
    this.props.setTodoEditStatus(todo.id, !todo.isEdit);
  }

  handleDelete(todo) {
    this.props.deleteTodo(todo.id);
  }

  handleEditChange(text, value) {
    this.props.changeNewTodo(value);
  }

  handleEditSubmit(todo) {
    this.props.updateTodo(todo.id);
  }

  render() {
    const { todos, login, logout, user, authenticated } = this.props;
    const showTodoList = ((todo, index) => {
      return(<div className="list-item" key={todo.id}>
        {!todo.isEdit ? 
          <ListCheckbox
          checked={todo.done}
          caption={todo.label}
          onChange={this.handleCheckboxChange.bind(this, todo)}
          />
        : <div>
            <Input
              label='Write' 
              onChange={this.handleEditChange.bind(this, 'text')} 
              defaultValue={todo.label} 
            />
            <Button 
              icon='done'
              label='Done'
              onClick={this.handleEditSubmit.bind(this, todo)} 
              raised
              primary
            />
            <Button 
              icon='cancel'
              label='Cancel'
              onClick={this.handleEdit.bind(this, todo)} 
              raised
              primary
            />
          </div>
        }
        <Button onClick={this.handleEdit.bind(this, todo)} icon='edit' floating accent mini/>
        <Button onClick={this.handleDelete.bind(this, todo)} icon='delete' floating accent mini/>
      </div>);
    });
    const showTodos = ((todos) => {
      const allTodos = [];
      for (var key in todos) {
        let temp = {};
        temp = {
          ...todos[key],
          id: key,
        };
        allTodos.push(temp);
      }
      return(<ul className="list-wrapper"><List selectable ripple>{allTodos && allTodos.length ? allTodos.map(showTodoList) : null }</List></ul>);
    });
    return (
      <Layout>
        <Panel>
          <Header
            login={login}
            logout={logout}
            user={user}
            loggedIn={authenticated}
          />
          {<div className="App">
            <h1 className="todo-header">Create Your Todo List</h1>
            <Input
              label='Write' 
              onChange={this.handleChange.bind(this, 'text')} 
              value={this.props.newTodo} 
            />
            <Button 
              icon='add'
              label='Add'
              onClick={this.handleSubmit} 
              raised
              primary
            />
            {todos ? showTodos(todos) : null }
          </div>}
        </Panel>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...getAuth(state),
    newTodo: state.todos.new,
    todos: state.todos.list,
  };
}
// const mapStateToProps = state => ({
//   newTodo: state.todos.new,
//   todos: state.todos.list,
// });
export default connect(mapStateToProps, {
  syncTodos: todoAction.syncTodos,
  changeNewTodo: todoAction.changeNewTodo,
  updateTodo: todoAction.updateTodo,
  saveNewTodo: todoAction.saveNewTodo,
  setTodoStatus: todoAction.setTodoStatus,
  setTodoEditStatus: todoAction.setTodoEditStatus,
  deleteTodo: todoAction.deleteTodo,
  login: AuthActions.login,
  logout: AuthActions.logout,
})(App);
