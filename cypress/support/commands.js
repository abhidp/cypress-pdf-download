before(() => {
  cy.visit(`/${Cypress.env().webReceiptId}`);
});

Cypress.Commands.overwrite('get', (get, selector) => {
  if (selector[0] !== '@') {
    return get(`[data-test=${selector}]`);
  }
});
