const XLSX = require('xlsx')
const fs = require('fs');
const arr = fs.readdirSync('./pdf2');
const newarr = arr.filter(e=>{
    return !e.includes('清单') && e.includes('pdf')
})
newarr.sort(function (a, b) { return a.localeCompare(b) })
let arrData = [];
let arrHeader = ['发票号码', '凭证号', '报销人', '报销日期', '发票金额'];
newarr.forEach(e=>{
    let list = e.split('-');
    let l = list.length;
    let item = [];
    let code = null
    let pingzheng = null;
    let name = null
    let date = null
    let money = null
    if(l==4){
         code = list[1];
         name = list[3].split('.')[0];
         date = new Date()
         money = list[2];
    }else if(l==3){
         pingzheng = list[0];
         name = list[2]
         date = new Date()
         money = list[1]
    }
    arrData.push([code, pingzheng, name,date,money]);
})

console.log(arrData)

arrData.unshift(arrHeader)
arrData.unshift(['合并信息',null,null,null,null]);


//1、定义导出文件名称
var filename = "write.xlsx";
// 定义导出数据
var data = arrData
// 定义excel文档的名称
var ws_name = "SheetJS";
// 初始化一个excel文件
var wb = XLSX.utils.book_new();
// 初始化一个excel文档，此时需要传入数据
var ws = XLSX.utils.aoa_to_sheet(data);

ws['!merges'] = [
    // 设置A1-C1的单元格合并
    {s: {r:0,c:0},e: {r:0,c:4}}
];
// 将文档插入文件并定义名称
XLSX.utils.book_append_sheet(wb, ws, ws_name);
// 执行下载
XLSX.writeFile(wb, filename);
XLSX.writeFile(wb, filename);