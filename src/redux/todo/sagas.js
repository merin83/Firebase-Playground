import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';

import todoAction from './actions';

import { RSF } from '../../helper/firebase';

const getUser = state => {
  const auth = state.auth.toJS();
  if (auth.user !== null) return auth.user;
  return null;
};

function* saveNewTodo() {
  const user = yield select(getUser);
  const newTodo = yield select(state => state.todos.new);
  yield call(RSF.database.create, `${user.uid}/todos`, {
    creator: user ? user.uid : null,
    done: false,
    isEdit: false, 
    label: newTodo,
  });
}

function* updateTodo(action) {
  const user = yield select(getUser);
  const newTodo = yield select(state => state.todos.new);
  yield call(RSF.database.patch, `${user.uid}/todos/${action.todoId}`, {
    isEdit: false, 
    label: newTodo,
  });
}

function* setTodoStatus(action) {
  const user = yield select(getUser);
  yield call(RSF.database.patch, `${user.uid}/todos/${action.todoId}`, {
    done: action.done,
  });
}

function* setTodoEditStatus(action) {
  const user = yield select(getUser);
  yield call(RSF.database.patch, `${user.uid}/todos/${action.todoId}`, {
    isEdit: action.isEdit,
  });
}

function* deleteTodo(action) {
  const user = yield select(getUser);
  yield call(RSF.database.delete, `${user.uid}/todos/${action.todoId}`);
}

const getuid = state => {
  const auth = state.auth.toJS();
  if (auth && auth.user !== null) return auth.user.uid;
  return null;
};

export function* syncTodo() {
  const uid = yield select(getuid);
  if (uid && uid !== null) {
    const channel = yield call(RSF.database.channel, `${uid}/todos`);
    while (true) {
      const { value: todos } = yield take(channel);
      yield put(todoAction.syncTodos(todos));
    }
  }
}

export default function* rootSaga() {
  // const todosTransformer = todos => Object.keys(todos).map(key => ({
  //   ...todos[key],
  //   id: key,
  // }))
  yield [
    takeEvery(todoAction.TODOS.SYNC, syncTodo),
    takeEvery(todoAction.TODOS.NEW.SAVE, saveNewTodo),
    takeEvery(todoAction.TODOS.SET_STATUS, setTodoStatus),
    takeEvery(todoAction.TODOS.SET_EDIT_STATUS, setTodoEditStatus),
    takeEvery(todoAction.TODOS.DELETE, deleteTodo),
    takeEvery(todoAction.TODOS.UPDATE, updateTodo),
  ];
}