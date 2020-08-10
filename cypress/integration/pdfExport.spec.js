describe('Validate PDF export feature', () => {
  before('Clear downloads folder', () => {
    cy.exec('rm cypress/downloads/SlypReceipt.pdf', { log: true, failOnNonZeroExit: false });
  });

  it('Should open action modal when clicked on kebab menu', () => {
    cy.get('KebabMenu').should('be.visible').click();
    cy.get('ExportPdfButton').should('be.visible');
    cy.get('ExportPdfButton').scrollIntoView().click();
    cy.task('isExistPDF', 'SlypReceipt.pdf').should('equal', true);
  });

  it('Should validate the contents of the PDF', () => {
    cy
      .task('getPDFContent', 'SlypReceipt_Working.pdf')
      .should(
        'include.members',
        [
          'General Pants',
          '107 Elizabeth Street',
          'Sydney, NSW, 2000',
          'ABN: 81 071 213 682',
          'Tax Invoice',
          '$518.90',
          'The Opposite Mesh Top White$139.95',
          'Hi & Wasted Jean The Streets Blue$179.95',
          'Clyde Heel Black Velvet$199.00',
          'Subtotal(3)$471.73',
          'Total$518.90',
          'Tax included in total$47.17',
          'Purchased on 19/07/2019, 14:34',
          'Return expires on 17/09/2019',
          'Return Policy',
          'This receipt can be used for exchange or refund.',
          '123456789012',
          'Thank you!',
          'Powered by',
        ],
        'PDF Corrupted'
      );
  });
});
