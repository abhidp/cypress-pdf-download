describe('Validate PDF export feature', () => {
  before('Clear old SlypReceipt.pdf files from downloads folder', () => {
    cy.exec('rm cypress/downloads/map.pdf', { log: true, failOnNonZeroExit: false });
    cy.visit('https://openlayers.org/en/latest/examples/export-pdf.html');
  });

  it('Test#1 Should open action modal when clicked on kebab menu', () => {
    cy.get('#export-pdf').click();
  });
});
