const PDFParser = require('pdf2json');
const fs = require('fs');
const path = require('path');
function checkRate(input) {
    var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
    if (!re.test(input)) {
        return false
    }
    return true
}
let n=0;
async function dealPDF(p){
    console.log("p:",p)
    console.log(++n)
    var pdfParser = new PDFParser(this, 1);
    pdfParser.loadPDF(p);
    let result = await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },2000)
        pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)));
        pdfParser.on('pdfParser_dataReady', () => {
            let data = pdfParser.getRawTextContent();
            console.log(data);
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
            num = arr[brage + 1];
            console.log(arr[brage])
            
            console.log(arr[brage + 1])

            let reg = /^[¥][0-9]+[.]?[0-9]+[\u4e00-\u9fa5]+$/
            let reg2 = /\d+(\.\d+)?/ig

            for (let j = 0; j < arr.length; j++) {
                if (reg.test(arr[j])) {
                    brage1 = arr[j];
                    break;
                }
            }
            let money = brage1.match(reg2)[0];
            console.log(money)
            // resolve();
            // fs.copyFile(p,`./pdf2/${n}-${code}-${num}-${money}-陈黎明.pdf`,(err)=>{
            //     if(err){
            //         console.log("报错了")
            //     }
            //     resolve()
            // })
            fs.copyFileSync(p, `./pdf2/${code}-${num}-${money}-陈黎明.pdf`);
            fs.unlinkSync(p);
            resolve()

        });
    })
    return result;
}

module.exports = dealPDF;