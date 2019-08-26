const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {set,get} = require('./src/db/redis')
const {access} = require('./src/utils/log')

//生成cookie失效的时间
const getExpireTime = ()=>{
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 *1000)) 
    return d.toGMTString()
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (postData) {
                resolve(JSON.parse(postData))
                return
            }
            resolve({})
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}\n`)
    
    //在控制台输出，让pm2记录日志
    console.log(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
   
    // 设置响应数据为JSON类型
    res.setHeader('Content-Type', 'application/json')

    // 请求路径
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers['cookie'] || ''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return 
        }
        const arr = item.split('=')
        const key = arr[0].trim()//trim()去掉空格
        const value = arr[1].trim()
        req.cookie[key] = value
    });

    // 解析session(使用redis)
    let needSetCookie = false
    let userid = req.cookie.userid//从cookie中获取userid
    if(!userid){
        needSetCookie = true
        userid = `${Date.now()}_${Math.random()}`//随机生成一个userid
        set(userid,{})//初始化redis中的session值
    }
    // 获取session
    req.sessionId = userid
    get(req.sessionId).then(sessionData=>{
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        }else{
            //同步redis中的数据到req.session
            req.session = sessionData
        }
        return getPostData(req) // 处理post data
    }).then((postData) => {
        req.body = postData //保存post数据
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userid};path=/;httpOnly; expires=${getExpireTime()}`)//只允许后端修改cookie
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userid};path=/;httpOnly; expires=${getExpireTime()}`)//只允许后端修改cookie
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // 未命中路由，返回404
        res.writeHead(404, {
            'Content-Type': "text/plain"
        })
        res.end('404 Not Found\n')
    })
}

module.exports = serverHandle