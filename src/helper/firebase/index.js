import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import config from '../../config';

const FirebaseApp = firebase.initializeApp(config.firebase);

export const RSF = new ReduxSagaFirebase(FirebaseApp);

export const FirebaseDB = firebase.database();
export const FirebaseAuth = firebase.auth();
export const FirebaseMsg = firebase.messaging();

export const getFirebaseAuthProvider = provider => {
  switch (provider) {
    case 'facebook':
      return new firebase.auth.FacebookAuthProvider();
    case 'google':
      return new firebase.auth.GoogleAuthProvider();
    case 'github':
      return new firebase.auth.GithubAuthProvider();
    case 'twitter':
      return new firebase.auth.TwitterAuthProvider();
    default:
      return null;
  }
};
