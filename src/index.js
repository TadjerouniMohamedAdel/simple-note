import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const firebase  = require('firebase')
require('firebase/firestore')
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "evernote-clone-5c86c.firebaseapp.com",
    databaseURL: "https://evernote-clone-5c86c.firebaseio.com",
    projectId: "evernote-clone-5c86c",
    storageBucket: "evernote-clone-5c86c.appspot.com",
    messagingSenderId: "1039768507842",
    appId: "1:1039768507842:web:d4cc11690fea52bf2df25b",
    measurementId: "G-3KCD4P1D2Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
