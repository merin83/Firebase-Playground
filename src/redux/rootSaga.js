import { all } from 'redux-saga/effects';
import todoSagas from './todo/sagas';
import authSagas from './auth/sagas';

export default function* rootSaga(getState) {
  yield all([authSagas(), todoSagas()]);
}
