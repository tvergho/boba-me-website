/* eslint-disable import/prefer-default-export */
import './src/styles/styles.scss';
import firebase from 'gatsby-plugin-firebase';
import 'firebase/auth';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem('expectSignIn', '1');
  } else {
    localStorage.removeItem('expectSignIn');
  }
});

export { wrapRootElement } from './apollo';
