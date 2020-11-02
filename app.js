const fs = require('fs');
const path = require('path');
const arr = fs.readdirSync('./pdf');
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
    
    let newarr = arr.slice(1,arr.length)
    console.log(newarr);
    for (let i = 0; i < newarr.length; i++) {
        let p = path.join(__dirname, 'pdf', newarr[i])
        await dealPDF(p)
    }
})()