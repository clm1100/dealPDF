const fs = require('fs');
const arr = fs.readdirSync('./pdf2');
console.log(arr);
let newarr = arr.slice(1,arr.length);
let sum = 0;
newarr.forEach(e=>{
    let money = e.split('-')[2];
    sum += (Number(money)*100)
})
console.log(sum/100)