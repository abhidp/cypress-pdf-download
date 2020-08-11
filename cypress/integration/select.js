describe('Validate PDF export feature', () => {
  before('Clear old SlypReceipt.pdf files from downloads folder', () => {
    cy.exec('rm cypress/downloads/Document.pdf', { log: true, failOnNonZeroExit: false });
    cy.visit('https://selectpdf.com/save-as-pdf-button');
  });

  it('Test#1 Should open action modal when clicked on kebab menu', () => {
    cy.get('img[src="//selectpdf.com/buttons/save-as-pdf3.gif"]').click();
  });
});
