describe('Validate PDF export feature', () => {
  before('Clear downloads folder', () => {
    cy.exec('rm cypress/downloads/*', { log: true, failOnNonZeroExit: false });
  });

  it('Should open action modal when clicked on kebab menu', () => {
    cy.get('KebabMenu').should('be.visible').click();
    cy.get('ExportPdfButton').should('be.visible');
    cy.get('ExportPdfButton').scrollIntoView().click();
    cy.task('isExistPDF', 'SlypReceipt.pdf').should('equal', true);
  });
});
