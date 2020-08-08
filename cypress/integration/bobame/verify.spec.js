/* eslint-disable max-len */
describe('Create business account', () => {
  const testEmail = 'example@example.com';
  const testPassword = 'Testable11$';

  beforeEach(() => {
    cy.viewport(1000, 1000);
  });

  before(() => {
    cy.visit('/verify/?mode=signIn&oobCode=-p57SLns-mflcEv3CKGRribg9mxA6OHFaYARYOtzMGMAAAFzu7cnxA&apiKey=AIzaSyBFx-xgMmczuxz1nKSSb1twkYWFTQizl_8&continueUrl=https%253A%252F%252Fwww.bobame.app%252Fverify&lang=en&businessName=Test%20Business&address=20977%20Fairwoods%20Ct&phone=+14084990354');
  });

  after(() => {
    cy.request('POST', 'https://api.bobame.app/admin/clean', { email: testEmail });
  });

  it('displays the account details screen', () => {
    cy.contains('Account Details').should('be.visible');
    cy.get('form').children().eq(0).should('have.value', 'Test Business');
  });

  it('creates a business successfully', () => {
    cy.get('input[placeholder=\'Email\']').type(testEmail);
    cy.get('input[placeholder=\'Password\']').type(testPassword);
    cy.get('input[placeholder=\'Confirm Password\']').type(testPassword);
    cy.contains('Next').click();

    cy.contains('Business Details', { timeout: 8000 }).should('be.visible');
    cy.get('input').eq(0).should('have.value', '20977 Fairwoods Court');
    cy.get('input').eq(3).should('have.value', '95014');
    cy.contains('Next').click();

    cy.contains('Payment Details', { timeout: 8000 }).should('be.visible');

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
    cy.get('.MuiInputBase-input').eq(0).should('have.value', '20977 Fairwoods Court');
    cy.contains('Next').click();

    cy.contains('Go to Dashboard', { timeout: 9000 }).should('be.visible');
    cy.contains('Go to Dashboard').click();
  });
});
