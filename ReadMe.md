This is a reproducible source code for the [Issue #8232](https://github.com/cypress-io/cypress/issues/8232) raised with Cypress

Instructions:
- clone this repo : `git clone https://github.com/abhidp/cypress-pdf-download.git`
- install dependencies: `npm install`
- open Cypress runner : `npm run cy:open`
- choose Chrome as the browser
- execute test : `pdfExport.spec.js`
- `Test#1` and `Test#3` will pass
- `Test#2` will fail because the downloaded PDF file is blank which is what this issue is all about

Tests will run against the url: https://receipts.uat-slyp.com.au/WRA-ba8511d6f86fcd488cc335a356ccadd2d37f1c30

Problem: 

When the above steps are executed in Cypress, it downloads a blank PDF file:  `/cypress/downloads/SlypReceipt.pdf`
When manually downloaded, you get the correct PDF file: `/cypress/downloads/SlypReceipt_Working.pdf`

Actual Result: Cypress downloads a blank PDF
Expected Result: Cypress should download the same PDF as downloaded manually 

Replication steps to download the PDF manually:
- navigate to the above url
- click on the Kebab menu (three vertical dots) at the top right corner of the page
  
  <img src="cypress/downloads/kebabMenu.jpg"  width="200">

- click on `Export as PDF` option and save it to your local disk


| PDF downloaded by Cypress   |   PDF downloaded manually |
| :---: | :---: |
| ![](cypress/downloads/PDF_downloaded_by_Cypress.jpg?raw=true "PDF downloaded by Cypress") | ![](cypress/downloads/PDF_downloaded_manually.jpg?raw=true "PDF downloaded by Cypress") |