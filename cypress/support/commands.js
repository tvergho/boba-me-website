// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase from 'firebase/app';
import 'firebase/auth';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyBFx-xgMmczuxz1nKSSb1twkYWFTQizl_8',
  authDomain: 'bobame-fe94d.firebaseapp.com',
  databaseURL: 'https://bobame-fe94d.firebaseio.com',
  projectId: 'bobame-fe94d',
  storageBucket: 'bobame-fe94d.appspot.com',
  messagingSenderId: '723059767047',
  appId: '1:723059767047:web:72e180fe5fde5a24c177a2',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add(
  'iframeLoaded',
  { prevSubject: 'element' },
  ($iframe) => {
    const contentWindow = $iframe.prop('contentWindow');
    return new Promise((resolve) => {
      if (
        contentWindow
              && contentWindow.document.readyState === 'complete'
      ) {
        resolve(contentWindow);
      } else {
        $iframe.on('load', () => {
          resolve(contentWindow);
        });
      }
    });
  },
);

Cypress.Commands.add(
  'getInDocument',
  { prevSubject: 'document' },
  (document, selector) => Cypress.$(selector, document),
);

Cypress.Commands.add(
  'getWithinIframe',
  (targetElement) => cy.get('iframe').iframeLoaded().its('document'),
);

Cypress.Commands.add(
  'iframe',
  { prevSubject: 'element' },
  ($iframe) => {
    return new Cypress.Promise((resolve) => {
      $iframe.on('load', () => {
        resolve($iframe.contents().find('body'));
      });
    });
  },
);
