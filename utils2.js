const PDFParser = require('pdf2json');
const colors = require( "colors")
const fs = require('fs');
const path = require('path');
const {fun5and7,fun3,fun4} = require('./funs/index')

let n=0;
async function dealPDF(p,name="陈黎明",dist){

    // console.log("p:",p)
    console.log(++n)
    var pdfParser = new PDFParser(this, 1);
    pdfParser.loadPDF(p);
    let result = await new Promise(async (resolve,reject)=>{
        pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)));
        let R1 = new Promise((r,j)=>{
            pdfParser.on("readable", meta => {
                r(meta.Meta.PDFFormatVersion)
            } )
        })
        let R2 = new Promise((r,j)=>{
            pdfParser.on('pdfParser_dataReady', () => {
                let data = pdfParser.getRawTextContent();
                r(data);
            });
        })
        let r1 = await R1;
        let r2 = await R2;
        // console.log(r1,r2);
        if(r1=='1.5'||r1=='1.7'){
            let {code,num,money} = fun5and7(r2)
            fs.copyFileSync(p, `./${dist}/${code}-${num}-${money}-${name}.pdf`);
            fs.unlinkSync(p);
            resolve()
        }else if(r1=='1.3'){
            let {code,num,money} = fun3(r2)
            fs.copyFileSync(p, `./${dist}/${code}-${num}-${money}-${name}.pdf`);
            fs.unlinkSync(p);
            resolve()
        }else if(r1=='1.4'){
            console.log("1.4")
            let {code,num,money} = fun4(r2)
            // console.log("疑点重重：",code,num,money)
            if(code==undefined&&num==undefined){
                resolve()
            }else{
                fs.copyFileSync(p, `./${dist}/${code}-${num}-${money}-${name}.pdf`);
                fs.unlinkSync(p);
                resolve()
            }
        }else{
            console.log("出现未知版本：",r1);
        }

         resolve()
    })
    return result;
}

module.exports = dealPDF;


// 1、读取版本
// 2、读取文件内容
// 3、根据版本截取内容
// 1和2是并发推导出结果=>
// 将结果传递给3
// 如果没有相应版本则跳过

// 1.3的内容

// 1.4的内容

// 1.5的内容

// 1.7的内容



