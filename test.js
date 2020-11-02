const PDFParser = require('pdf2json');
const fs = require('fs');
const src = './pdf';

var pdfParser = new PDFParser(this, 1);
pdfParser.loadPDF(`${src}/滴滴电子发票B.pdf`);
pdfParser.on('pdfParser_dataError', errData => console.log(errData));
pdfParser.on('pdfParser_dataReady', (pdfData) => {
    console.log("ioio")
    let data = pdfParser.getRawTextContent();
    console.log(pdfData);

});

// fs.readFile('./pdf/滴滴电子发票B.pdf', (err, pdfBuffer) => {
//     console.log(err);
//     if (!err) {
//         console.log(pdfParser.parseBuffer(pdfBuffer));
//     }
// })