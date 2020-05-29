import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config={
    apiKey: "AIzaSyCPCQtm5Iz9uFfttxulM2MTyn8omEJxnEw",
    authDomain: "crwn-db-22a12.firebaseapp.com",
    databaseURL: "https://crwn-db-22a12.firebaseio.com",
    projectId: "crwn-db-22a12",
    storageBucket: "crwn-db-22a12.appspot.com",
    messagingSenderId: "828272318108",
    appId: "1:828272318108:web:363ee3da75a900d722ff59",
    measurementId: "G-3PMJC0711W"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;