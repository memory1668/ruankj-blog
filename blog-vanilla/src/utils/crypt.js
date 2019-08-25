const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'Jab21_-#B88'//不可泄露和修改

// md5加密
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')//输出16进制
}

//加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}