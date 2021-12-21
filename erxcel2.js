#!/usr/bin/env node
const XLSX = require('xlsx')
const XLSXStyle = require('xlsx-style')
const fs = require('fs');
const pathPDF = process.cwd();
const arr = fs.readdirSync(pathPDF);
const newarr = arr.filter(e => {
    return !e.includes('清单') && e.includes('pdf')
})
const defaultCellStyle = {
    font: { name: "宋体", sz: 11, color: { auto: 1 } },
    border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
    },
    alignment: {
        /// 自动换行
        wrapText: 1,
        // 居中
        horizontal: "center",
        vertical: "center",
        indent: 0
    }
}

const titleStyle = {
    font: {
        name: "宋体", sz: 24,  bold: true,color: { rgb: "FFFFAA00" } },
    border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
    },
    alignment: {
        horizontal: "center",
        vertical: "center",
        indent: 0
    }
}

let tableData = newarr.map(e=>{
    let reg = /[-|_|—]+/;
    let list = e.split(reg);
    let l = list.length;
    let code = ''
    let pingzheng = '';
    let name = ''
    let date = ''
    let money = '';
    if (l == 4) {
        code = list[1];
        name = list[3].split('.')[0];
        money = list[2];
    } else if (l == 3) {
        pingzheng = list[0];
        name = list[2].split('.')[0]
        money = list[1]
    }
    return {
        code,pingzheng,money,date,name
    }
})

tableData.sort((a,b)=>a.name.localeCompare(b.name));

let table = tableData.map((e,i)=>{
    return [
        // i+1,
        // e.code,
        // e.pingzheng,
        // e.name,
        // e.date,
        // e.money
        { v: i + 1, s: defaultCellStyle},
        { v: e.code, s: defaultCellStyle },
        { v: e.pingzheng, s: defaultCellStyle },
        { v: e.name, s: defaultCellStyle },
        { v: e.date, s: defaultCellStyle },
        { v: e.money, s: defaultCellStyle, t: "n"}
    ]
})


let arrHeader = ['序号','发票号码', '凭证号', '报销人', '报销日期', '发票金额'].map(e=>{
    return {
        v:e,
        s: defaultCellStyle
    }
})



table.unshift(arrHeader)
table.unshift([{
    v: '北京华亿创新信息技术有限公司电子发票报销台账（2020年）',
    s: titleStyle
}, { v: null, s: titleStyle }, { v: null, s: titleStyle }, { v: null, s: titleStyle }, { v: null, s: titleStyle }, { v: null, s: titleStyle }]);


//1、定义导出文件名称
var filename = "write.xlsx";
// 定义导出数据
var data = table
// 定义excel文档的名称
var ws_name = "2020年电子发票台账";
// 初始化一个excel文件
var wb = XLSX.utils.book_new();
// 初始化一个excel文档，此时需要传入数据
var ws = XLSX.utils.aoa_to_sheet(data);

ws['!merges'] = [
    // 设置A1-C1的单元格合并
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }
];
ws['!cols'] = [
    { wch: 9 }, // 第一列
    { wch: 10 }, // 第二列
    { wch: 15 }, // 第三列
    { wch: 10 }, // 第二列
]
// 将文档插入文件并定义名称
XLSX.utils.book_append_sheet(wb, ws, ws_name);
// 执行下载
// XLSX.writeFile(wb, filename);
XLSXStyle.writeFile(wb, filename);