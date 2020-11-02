let str = '¥123.3213维吾尔文';
let reg = /^[0-9]+[.]?[0-9]?$/
console.log(str.match(/\d+(\.\d+)?/ig, ""));