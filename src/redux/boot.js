import { store } from './store';
import { FirebaseAuth } from '../helper/firebase';
import AuthActions from './auth/actions';
import TodoActions from './todo/actions';


export default () => new Promise((resolve, reject) => {
  const unsub = FirebaseAuth.onAuthStateChanged(
    user => {
      if (user !== null) {
        store.dispatch(AuthActions.syncUser(user));
        store.dispatch(TodoActions.syncTodos());
      }
      unsub();
      resolve();
    },
    error => reject(error),
  );
});
