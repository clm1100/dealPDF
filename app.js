#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const pathPdf = process.cwd();
const arr = fs.readdirSync(pathPdf);
const dealPDF = require('./utils2');
let name = fs.readFileSync('./name.txt','utf8');
    name = name.replace(/\s*/g,"");
let d = new Date();
let H = d.getHours()
let M = d.getMinutes()
let S = d.getSeconds()

let dist = "App"+H+""+M+""+S;

// const exec = require('child_process').exec;
// const cmdStr = `rm -rf ${path.join(__dirname,'pdf2')}`;
// const name = process.argv[2];
// if(!name) return c'le

// (async()=>{
//     await new Promise((resolve,reject)=>{
//         exec(cmdStr, function (err, stdout, srderr) {
//             if (err) {
//                 console.log(srderr);
//                 resolve()
//             } else {
//                 console.log(stdout);
//                 resolve()
//             }
//         })

//     })
//     fs.mkdirSync('pdf2')   
//     let newarr = arr.filter(e=>!!e.includes('.pdf'))
//     console.log(newarr);
//     console.log(name)
//     for (let i = 0; i < newarr.length; i++) {
//         let p = path.join(pathPdf, newarr[i])
//         await dealPDF(p,name)
//     }
// })()

(async()=>{
    console.log(dist)
    fs.mkdirSync(dist.toString())   
    let newarr = arr.filter(e=>!!e.includes('.pdf'))
    console.log(newarr);
    console.log(name)
    for (let i = 0; i < newarr.length; i++) {
        let p = path.join(pathPdf, newarr[i])
        await dealPDF(p,name,dist)
    }
})()