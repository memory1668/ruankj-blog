const {login} = require('../controller/user')
const {SuccessModule,ErrorModule} = require('../module/resModule')
const {set} = require('../db/redis')

const handleUserRouter = (req,res)=>{
    const method = req.method//GET/POST
    // 用户登录
    if(method === 'POST' && req.path === '/api/user/login'){
        //来自post的用户名和密码信息
        const {username,password} = req.body
        const result = login(username+'',password)
        return result.then(val=>{
            // 登录成功
            if(val.username){
                req.session.username = val.username//修改SESSION_DATA对象
                req.session.password = val.password
                // 更新redis
                set(req.sessionId,req.session)
                return new SuccessModule()
            // 登录失败
            }else{//如果登录失败val.username为undefined
                return new ErrorModule('登录失败')
            }
        })
    }
    // 登录验证测试
    // if(method === 'GET' && req.path === '/api/blog/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(new SuccessModule({username:req.session.username}))
    //     }else{
    //         return Promise.resolve(new ErrorModule('登录失败'))
    //     }
    // }
}

module.exports = handleUserRouter