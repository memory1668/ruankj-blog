const fs = require('fs')
const path = require('path')


// 写日志
function writeLog(writestream,log){
    writestream.write(log)
}
// 创建write stream
function createWriteStream(fileName){
    fileName = path.join(__dirname,'../','../','logs/',fileName)
    return fs.createWriteStream(fileName,{flags:'a'})
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log){
    writeLog(accessWriteStream,log)
}

module.exports = {
    access
}