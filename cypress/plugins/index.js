/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
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

const parsePDF = (PDFfilename) => {
  const PDFfile = `${downloadDirectory}/${PDFfilename}`;
  const dataBuffer = fs.readFileSync(PDFfile);
  let textArray = [];
  return new Promise((resolve, reject) => {
    const data = pdfParse(dataBuffer)
      .then((data) => {
        return resolve(data.text.split('\n').filter(Boolean));
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = (on, config) => {
  on('before:browser:launch', (browser, options) => {
    if (browser.family === 'chromium') {
      options.preferences.default['download'] = {
        default_directory: downloadDirectory,
      };
      return options;
    }
    if (browser.family === 'firefox') {
      options.preferences['browser.download.dir'] = downloadDirectory;
      options.preferences['browser.download.folderList'] = 2;
      options.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv';
      return options;
    }
  });
  on('task', {
    isExistPDF(PDFfilename, ms = 5000) {
      console.log(`looking for PDF file in ${downloadDirectory}`, PDFfilename, ms);
      return hasPDF(PDFfilename, ms);
    },
    getPDFContent(PDFfilename) {
      return parsePDF(PDFfilename);
    },
  });

  return config;
};
