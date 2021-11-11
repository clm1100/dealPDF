// let reg = /￥/
// let reg = /["价税合计"]+[\u4e00-\u9fa5]?(￥)(-?[0-9,]+)(\.[0-9]+)?/
// let r = reg.test("合计￥35.85￥2.15")
// console.log(r);
// "pdf2json": "^1.2.0",
const fs = require('fs');
const   PDFParser = require("pdf2json");

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./F1040EZ.json", JSON.stringify(pdfData),()=>{});
    });

    pdfParser.loadPDF("./4.pdf");