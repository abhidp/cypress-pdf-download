describe('Validate PDF export feature', () => {
  before('Clear old SlypReceipt.pdf files from downloads folder', () => {
    cy.exec('rm cypress/downloads/SlypReceipt.pdf', { log: true, failOnNonZeroExit: false });
    cy.visit('https://receipts.uat-slyp.com.au/WRA-ba8511d6f86fcd488cc335a356ccadd2d37f1c30');
  });

  it('Test#1 Should open action modal when clicked on kebab menu', () => {
    cy.get('[data-test="KebabMenu"]').should('be.visible').click();
    cy.get('[data-test="ExportPdfButton"]').should('be.visible');
    cy.get('[data-test="ExportPdfButton"]').scrollIntoView().click();
    cy.task('isExistPDF', 'SlypReceipt.pdf').should('equal', true);
  });

  it('Test#2 ACTUAL RESULT -- VALIDATE CONTENTS OF PDF DOWNLOADED BY CYPRESS (SlypReceipt.pdf)', () => {
    cy
      .task('getPDFContent', 'SlypReceipt.pdf')
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
        'PDF Contents Validation'
      );
  });

  it('Test#3 EXPECTED RESULT -- VALIDATE CONTENTS OF PDF DOWNLOADED MANUALLY (SlypReceipt_Working.pdf)', () => {
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
        'PDF Contents Validation'
      );
  });
});
