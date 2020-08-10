/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const path = require('path');
const fs = require('fs');
const downloadDirectory = path.join(__dirname, '..', 'downloads');

const findPDF = (PDFfilename) => {
  const PDFfile = `${downloadDirectory}/${PDFfilename}`;
  const contents = fs.existsSync(PDFfile);
  return contents;
};

const hasPDF = (PDFfilename, ms) => {
  const delay = 10;
  return new Promise((resolve, reject) => {
    if (ms < 10) {
      return resolve(false);
    }
    const found = findPDF(PDFfilename);
    if (found) {
      return resolve(true);
    }
    setTimeout(() => {
      hasPDF(PDFfilename, ms - delay).then(resolve, reject);
    }, 10);
  });
};

module.exports = (on, config) => {
  on('task', {
    isExistPDF(PDFfilename, ms = 5000) {
      console.log(`looking for PDF file in ${downloadDirectory}`, PDFfilename, ms);
      return hasPDF(PDFfilename, ms);
    },
  });

  return config;
};
