import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration - matches backend
const firebaseConfig = {
  apiKey: "AIzaSyAx1ltcGH7j5R8YeuuuTMn3wxJT17-LJxQ",
  authDomain: "flacronai-c8dab.firebaseapp.com",
  projectId: "flacronai-c8dab",
  storageBucket: "flacronai-c8dab.firebasestorage.app",
  messagingSenderId: "924587706021",
  appId: "1:924587706021:web:eec9131d64c8ee0f81ef4c",
  measurementId: "G-0NYRHLSYMQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const appleProvider = new firebase.auth.OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

export {
  auth,
  db,
  googleProvider,
  appleProvider,
  firebase
};

export default firebase;
