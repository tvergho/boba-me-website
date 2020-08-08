describe('Login page', () => {
  const testEmail = 'tyler.vergho19@bcp.org';
  const testPassword = 'Testable11$';

  beforeEach(() => {
    cy.viewport(1000, 1000);
  });

  it('Visits the login page', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('Correctly handles incorrect password', () => {
    cy.get('input[placeholder=\'Email\']').type('a@a.com');
    cy.get('input[placeholder=\'Password\']').type(`${testPassword}$`);
    cy.get('.submit').contains('Sign in').click();
    cy.contains('Email or password is incorrect.').should('exist');
  });

  it('Should handle invalid email', () => {
    cy.get('input[placeholder=\'Email\']').clear();
    cy.get('input[placeholder=\'Password\']').clear();

    cy.get('input[placeholder=\'Email\']').type('a');
    cy.get('input[placeholder=\'Password\']').type(testPassword);

    cy.get('.submit').contains('Sign in').click();
    cy.contains('Not a valid email address.').should('exist');
  });

  it('Should transition to incorrect password screen, confirm a sent email, and go back', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.contains('Forgot your password?').click();

    cy.contains('Forgot Password');
    cy.contains('Reset your password').should('be.disabled');
    cy.get('input[placeholder=\'Enter your email...\']').type('example@example.com');
    cy.contains('Reset your password').click();
    cy.contains('A recovery link has been sent to').should('be.visible');

    cy.contains('Back to Login').click();
    cy.contains('Business Login').should('be.visible');
  });

  it('Should successfully login', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // Account for exception from incorrect email on previous screen.
      return false;
    });

    cy.get('input[placeholder=\'Email\']').clear();
    cy.get('input[placeholder=\'Password\']').clear();

    cy.get('input[placeholder=\'Email\']').type(testEmail);
    cy.get('input[placeholder=\'Password\']').type(testPassword);

    cy.get('.submit').contains('Sign in').click();
    cy.url().should('equal', 'http://localhost:8000/dashboard');
  });
});
