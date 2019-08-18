const {loginCheck} = require('../controller/user')
const {SuccessModule,ErrorModule} = require('../module/resModule')

const handleUserRouter = (req,res)=>{
    const method = req.method//GET/POST
    // 用户登录
    if(method === 'POST' && req.path === '/api/blog/login'){
        const result = loginCheck(req.body.username,req.body.password)
        if(result){
            return new SuccessModule()
        }else{
            return new ErrorModule('登录失败')
        }
    }
}

module.exports = handleUserRouter