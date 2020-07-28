/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
import './src/styles/styles.scss';
import firebase from 'gatsby-plugin-firebase';
import 'firebase/auth';
import { navigate } from 'gatsby';

firebase.auth().onAuthStateChanged((user) => {
  const path = location.pathname;
  if (user) {
    localStorage.setItem('expectSignIn', '1');
  } else {
    console.log('removed');
    localStorage.removeItem('expectSignIn');
    if (path.includes('dashboard')) navigate('/dashboard/login');
  }
});

export { wrapRootElement } from './apollo';
