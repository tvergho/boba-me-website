/* eslint-disable import/prefer-default-export */
import './src/styles/styles.scss';
import React from 'react';
import {
  ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,
} from '@apollo/client';
import * as firebase from 'firebase/app';
import { setContext } from '@apollo/client/link/context';
import firebaseConfig from './firebase-config';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem('expectSignIn', '1');
  } else {
    localStorage.removeItem('expectSignIn');
  }
});

const httpLink = createHttpLink({
  uri: 'https://btmf5q4phbd2jb5yzzpif2bzte.appsync-api.us-east-2.amazonaws.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken()
      .then((token) => {
        resolve({
          headers: {
            'x-api-key': 'da2-65qxkcps4vfm3jidszn4glymcu',
            authorization: token,
          },
        });
      })
      .catch(() => {
        resolve({
          headers: {
            'x-api-key': 'da2-65qxkcps4vfm3jidszn4glymcu',
          },
        });
      });
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  );
};

export { wrapRootElement };
