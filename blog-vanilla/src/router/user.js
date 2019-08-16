const handleUserRouter = (req,res)=>{
    const method = req.method//GET/POST
    // 用户登录
    if(method === 'POST' && req.path === '/api/blog/login'){
        return {
            msg: '这是用户登录接口'
        }
    }
}

module.exports = handleUserRouter