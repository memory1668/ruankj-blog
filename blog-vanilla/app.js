const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req,res)=>{
    // 设置响应数据为JSON类型
    res.setHeader('Content-Type','application/json')

    // 请求路径
    const url = req.url
    req.path = url.split('?')[0]

    // 处理blog路由
    const blogData = handleBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    // 处理user路由
    const userData = handleUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    // 未命中路由，返回404
    res.writeHead(404,{'Content-Type':"text/plain"})
    res.end('404 Not Found\n')
}

module.exports = serverHandle