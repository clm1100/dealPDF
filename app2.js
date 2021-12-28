#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const pathPdf = process.cwd();
const arr = fs.readdirSync(pathPdf);
const dealPDF = require('./utils2');
let name = process.argv[2]||'未知';
let d = new Date();
let H = d.getHours()
let M = d.getMinutes()
let S = d.getSeconds()

let dist = "App"+H+""+M+""+S;

const start = async () => {
    console.log(dist)
    fs.mkdirSync(dist.toString())   
    let newarr = arr.filter(e=>!!e.includes('.pdf'))
    console.log(newarr);
    console.log(name)
    for (let i = 0; i < newarr.length; i++) {
        let p = path.join(pathPdf, newarr[i])
        await dealPDF(p,name,dist)
    }
}
start();