const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 创建read stream对象
fileName = path.join(__dirname,'../','../','logs/','access.log')
const rs = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface({
    input:rs
})

let sum = 0//总数
let chromeNum = 0//chrome的数量

// 逐行读取
rl.on('line',lineData=>{
    if(!lineData){
        return
    }
    sum++
    if(lineData.indexOf('Chrome')>0){
        chromeNum++
    }
})
// 读取结束
rl.on('close',()=>{
    console.log('chrome占比' + chromeNum/sum);
})

