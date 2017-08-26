const types = {
  TODOS: {
    SYNC: 'TODOS.SYNC',
    SET_STATUS: 'TODOS.SET_STATUS',
    SET_EDIT_STATUS: 'TODOS.SET_EDIT_STATUS',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    NEW: {
      CHANGE: 'TODOS.NEW.CHANGE',
      SAVE: 'TODOS.NEW.SAVE',
    },
  },

  syncTodos: todos => ({
    type: types.TODOS.SYNC,
    todos,
  }),

  changeNewTodo: todo => ({
    type: types.TODOS.NEW.CHANGE,
    todo,
  }),

  saveNewTodo: () => ({
    type: types.TODOS.NEW.SAVE,
  }),

  deleteTodo: (todoId) => ({
    type: types.TODOS.DELETE,
    todoId,
  }),

  updateTodo: (todoId, todo, isEdit) => ({
    type: types.TODOS.UPDATE,
    todoId,
  }),

  setTodoStatus: (todoId, done) => ({
    type: types.TODOS.SET_STATUS,
    todoId,
    done,
  }),

  setTodoEditStatus: (todoId, isEdit) => ({
    type: types.TODOS.SET_EDIT_STATUS,
    todoId,
    isEdit,
  }),

};

export default types;