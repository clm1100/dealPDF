const PDFParser = require('pdf2json');
const colors = require( "colors")
const fs = require('fs');
const path = require('path');
function checkRate(input) {
    // var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
    let re = /^[0|1]\d{11}/

    if (!re.test(input)) {
        return false
    }
    return true
}
let n=0;
async function dealPDF(p,name="陈黎明"){

    console.log("p:",p)
    console.log(++n)
    let pdfParser = new PDFParser();
    pdfParser.loadPDF(p);
    let result = await new Promise((resolve,reject)=>{
        pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)));
        pdfParser.on('pdfParser_dataReady', () => {
            let data = pdfParser.getRawTextContent();
            console.log("pdf的内容".red,data);
            let arr = data.split(/\r\n/)
            let brage = 0
            let brage1 = '';
            let code ='';
            let num = ''
            for (let i = 0; i < arr.length; i++) {
                if (checkRate(arr[i])) {
                    brage = i;
                    break;
                }
            }

            code = arr[brage];
            console.log("code".red,code)
            num = arr[brage + 1];
            console.log("num".red,num)
            console.log(arr[brage])
            
            console.log(arr[brage + 1])

            let reg = /(￥|¥)(-?[0-9,]+)(\.[0-9]+)?/g
            // let reg = /"价税合计"+[\u4e00-\u9fa5]?(￥)(-?[0-9,]+)(\.[0-9]+)?/
            // let reg2 = /\d+(\.\d+)?/ig
            let reg2 = /\d+\.?\d*/g
            

            let arrmoney=[];

            for (let j = 0; j < arr.length; j++) {
                let n = arr[j].match(reg);
                if(n!=null){
                    arrmoney=[...n,...arrmoney]
                    console.log(n);
                }
            }
            console.log("arrmoney:".red,arrmoney);
            // console.log("brage1:".red,brage1)
            let moneys = arrmoney.map(e=>{
                console.log(e.match(reg2)[0]);
               return Number(e.match(reg2)[0])
            })
            let money = Math.max.apply(null,moneys);
            console.log(money)
            // fs.copyFileSync(p, `./pdf2/${code}-${num}-${money}-${name}.pdf`);
            // fs.unlinkSync(p);
            resolve()
        });
    })
    return result;
}

module.exports = dealPDF;