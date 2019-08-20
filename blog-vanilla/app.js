const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

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
    // 设置响应数据为JSON类型
    res.setHeader('Content-Type', 'application/json')

    // 请求路径
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 处理post data
    getPostData(req).then((postData) => {
        req.body = postData //保存post数据
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        // 处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
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