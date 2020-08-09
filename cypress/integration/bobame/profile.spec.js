/* eslint-disable cypress/no-unnecessary-waiting */
import firebase from 'firebase';
import 'firebase/firebase-auth';

firebase.initializeApp({
  apiKey: 'AIzaSyBFx-xgMmczuxz1nKSSb1twkYWFTQizl_8',
  authDomain: 'bobame-fe94d.firebaseapp.com',
  databaseURL: 'https://bobame-fe94d.firebaseio.com',
  projectId: 'bobame-fe94d',
  storageBucket: 'bobame-fe94d.appspot.com',
  messagingSenderId: '723059767047',
  appId: '1:723059767047:web:72e180fe5fde5a24c177a2',
});

describe('Profile page', () => {
  const testEmail = 'tyler.vergho19@bcp.org';
  const originalPassword = 'Testable11$';
  const changedPassword = '12345678';

  before(() => {
    cy.viewport(1000, 1000);
    cy.wrap(firebase.auth().signInWithEmailAndPassword(testEmail, originalPassword)).then(() => {
      localStorage.setItem('expectSignIn', '1');
      cy.visit('/dashboard');
    });
  });

  it('logs in', () => {
    cy.url().should('equal', 'http://localhost:8000/dashboard/');
  });

  it('sets name', () => {
    cy.contains('Business Name').siblings().clear().type('Tea Society');
    cy.contains('Save').click();
    cy.contains('Saving...').should('be.visible');
    cy.contains('Welcome, Tea Society').should('be.visible');

    cy.contains('Business Name').siblings().clear().type('Tyler\'s Tea');
    cy.contains('Save').click();
  });

  it('changes password', () => {
    cy.contains('Change password').siblings().clear().type(changedPassword);
    cy.contains('Save').click();
    cy.contains('Enter your original password again for security.').should('be.visible');
    cy.contains('Password').siblings().type(originalPassword);
    cy.contains('Submit').click();

    cy.contains('Enter your original password again for security.').should('not.exist');
    cy.contains('Sign out').click();

    cy.get('input[placeholder=\'Email\']').type(testEmail);
    cy.get('input[placeholder=\'Password\']').type(changedPassword);
    cy.get('.submit').contains('Sign in').click();

    cy.contains('Change password').siblings().clear().type(originalPassword);
    cy.contains('Save').click();
    cy.contains('Password').siblings().type(changedPassword);
    cy.contains('Submit').click();

    cy.contains('Enter your original password again for security.').should('not.exist');
  });

  it('change default image', () => {
    cy.get('.ReactGridGallery_tile').eq(3).children().click({ multiple: true, force: true });
    cy.get('object[aria-label=\'Business\']').then((obj) => {
      const imageSrc = obj.attr('data');
      cy.contains('Set as Default').click();
      cy.get('object[aria-label=\'Business\']').its('data').should('not.equal', imageSrc);
      cy.contains('Set as Default').click();
    });
  });

  it('can add and remove cards', () => {
    cy.get('.backdrop').should('not.be.visible');
    cy.get('[data-cy=sidebar-title]').contains('Payment').parent().click({ force: true });
    cy.get('h2').should('have.text', 'Payment');
    cy.wait(1500);
    cy.contains('Delete').click();
    cy.contains('Delete your credit card').should('be.visible');
    cy.get('.buttons').contains('Delete').click();

    cy.contains('Add a credit card to get started with BobaMe.').should('be.visible');
    cy.contains('Add Card').click();
    cy.contains('Edit your payment details').should('be.visible');

    cy.get('iframe')
      .iframe()
      .find('input[name="cardnumber"]')
      .type('4030150197995433');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="exp-date"]')
      .type('0627');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="cvc"]')
      .type('713');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="postal"]')
      .type('95014');
    cy.get('.PrivateSwitchBase-input-4').check();
    cy.get('.MuiInputBase-input').eq(0).should('have.value', '1 Infinite Loop');
    cy.get('.buttons').contains('Save').click();

    cy.contains('xxxxxxxxxxxx5433', { timeout: 8000 }).should('be.visible');
  });

  it('changes cards', () => {
    cy.get('[data-cy=sidebar-title]').contains('Payment').parent().click({ force: true });
    cy.wait(1500);
    cy.contains('Edit').click();
    cy.contains('Edit your payment details').should('be.visible');

    cy.get('iframe')
      .iframe()
      .find('input[name="cardnumber"]')
      .type('4030150197995441');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="exp-date"]')
      .type('0627');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="cvc"]')
      .type('779');
    cy.get('iframe')
      .iframeLoaded()
      .its('document')
      .getInDocument('input[name="postal"]')
      .type('95014');
    cy.get('.buttons').contains('Save').click();

    cy.contains('xxxxxxxxxxxx5441', { timeout: 8000 }).should('be.visible');
  });
});
