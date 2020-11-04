const fs = require('fs');
const arr = fs.readdirSync('./pdf2');
// console.log(arr);
let newarr = arr.slice(1, arr.length);
let sum = 0;
newarr.forEach(e => {

    let l = e.split('-');
    let money = 0;
    if (l.length == 4) {
        money = e.split('-')[2];
        if(money.includes('清单')){
            money=0
        }else{
            money = e.split('-')[2]
        }
    } else if(l.length==3){
        money = e.split('-')[1];
    }else{
        console.log(l);
        console.log("空数据")
    }
    // console.log(money)
    sum += (Number(money) * 100)
})
console.log(sum / 100)