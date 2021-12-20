// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
const OcrClient = tencentcloud.ocr.v20181119.Client;
const fs = require('fs');
const path = require('path');
let pdfBase64 = fs.readFileSync('./pdf2/012002100311-54213119-39.9-陈黎明.pdf',{encoding:'base64'});
// console.log(pdfBase64)

const clientConfig = {
  credential: {
    secretId: "AKIDrYz92f16uRjolVzC8nCKBl6AxTigNoxp",
    secretKey: "f3A0Zrra9RRAZhX6OP9ctud5F8k47uQf",
  },
  region: "ap-beijing",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
};

const client = new OcrClient(clientConfig);
const params = {
    "ImageBase64": pdfBase64,
    "IsPdf": true,
    "PdfPageNumber": 1
};
client.VatInvoiceOCR(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);