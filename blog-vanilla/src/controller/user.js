const {exec} = require('../db/mysql')

const login = (username,password)=>{
  const sql = `select username,password from users where username='${username}' and password='${password}'`
  return exec(sql).then(loginData=>{
      return loginData[0] || {}//用户名和密码校验失败返回空对象(loginData[0]=undefined)
  })
}

module.exports = {
    login
}