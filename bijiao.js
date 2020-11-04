const fs = require('fs');
const arr2 = fs.readdirSync('./pdf2');
const arr3 = fs.readdirSync('./pdf3');
console.log(arr2.length);
console.log(arr3.length);