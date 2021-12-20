// 根据版本来设计函数
// 1.5和1.7通用



function checkRate(input) {
    // var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
    let re = /^[0|1]\d{11}/

    if (!re.test(input)) {
        return false
    }
    return true
}


function fun5and7(data){
    let arr = data.split(/\r\n/)
    console.log(arr);
    let brage = 0
    let code ='';
    let num = ''
    for (let i = 0; i < arr.length; i++) {
        if (checkRate(arr[i])) {
            brage = i;
            break;
        }
    }

    code = arr[brage];
    // console.log("code".red,code)
    num = arr[brage + 1];
    // console.log("num".red,num)
    // console.log(arr[brage])
    
    // console.log(arr[brage + 1])

    let reg = /(￥|¥)(-?[0-9,]+)(\.[0-9]+)?/g
    // let reg = /"价税合计"+[\u4e00-\u9fa5]?(￥)(-?[0-9,]+)(\.[0-9]+)?/
    // let reg2 = /\d+(\.\d+)?/ig
    let reg2 = /\d+\.?\d*/g
    

    let arrmoney=[];

    for (let j = 0; j < arr.length; j++) {
        let str = arr[j].replace(/\s*/g,"")
        let n = str.match(reg);
        if(n!=null){
            arrmoney=[...n,...arrmoney]
            // console.log(n);
        }
    }
    // console.log("arrmoney:".red,arrmoney);
    let moneys = arrmoney.map(e=>{
        // console.log(e.match(reg2)[0]);
       return Number(e.match(reg2)[0])
    })
    let money = Math.max.apply(null,moneys);
    return {
        code,
        num,
        money
    }
}



function fun3(data){
    let arr = data.split(/\r\n/);
    // console.log("<=====1.3")
    // console.log(arr);
    // console.log("=====>1.3")
    let brage = 0
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
    let moneyText = arr[brage+11];
    let money = moneyText.replace(/[^0-9[.]/ig,"")
    return {
        code,
        num,
        money
    }
}

function fun4plus(data){
    return fun5and7(data)
}


function fun4(data){
    let arr = data.split(/\r\n/);
    console.log("<=====1.4")
    console.log(arr);
    console.log("=====>1.4")
    let codeText,numText,moneyText;
    let code,num,money;

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].includes('发票代码')){
            codeText= arr[i]
            continue
        }
        if(arr[i].includes('发票号码')){
            numText= arr[i]
            continue
        }
        if(arr[i].includes('价税合计')){
            moneyText= arr[i]
            continue
        }
    }

    try {
      code  = codeText.replace(/[^0-9[.]/ig,"")
      num   = numText.replace(/[^0-9[.]/ig,"")
      money = moneyText.replace(/[^0-9[.]/ig,"")
        console.log("<=====",code=="",num=="",money=="","===>")
        if(code==''&&num==""){
            let obj = fun4plus(data);
            return {...obj}
        }
        

    } catch (error) {
        
    }
    // console.log({
    //     code,
    //     num,
    //     money
    // })
    return {
        code,
        num,
        money
    }
}

module.exports = {
    fun5and7,
    fun3,
    fun4
}