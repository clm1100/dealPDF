#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const pathPdf = process.cwd();
const arr = fs.readdirSync(pathPdf);
const dealPDF = require('./utils');
var exec = require('child_process').exec;
var cmdStr = `rm -rf ${path.join(__dirname,'pdf2')}`;

(async()=>{
    await new Promise((resolve,reject)=>{
        exec(cmdStr, function (err, stdout, srderr) {
            if (err) {
                console.log(srderr);
                resolve()
            } else {
                console.log(stdout);
                resolve()
            }
        })

    })
    fs.mkdirSync('pdf2')   
    let newarr = arr.filter(e=>!!e.includes('.pdf'))
    console.log(newarr);
    for (let i = 0; i < newarr.length; i++) {
        let p = path.join(pathPdf, newarr[i])
        await dealPDF(p)
    }
})()