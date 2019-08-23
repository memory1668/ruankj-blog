const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {
    SuccessModule,
    ErrorModule
} = require('../module/resModule')

const handleBlogRouter = (req, res) => {
    const method = req.method //GET/POST
    const id = req.query.id //博客id
    //检查登录状态
    const loginCheck = (req)=>{
        if(!req.session.username){
            return Promise.resolve(
                new ErrorModule('登录失败')
            )
        }
    }

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 如果是管理博客界面验证登录
        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                // 登录失败
                 return loginCheckResult
            }
            //强制查询自己的博客
            author = req.session.username
        }
        const listResult = getList(author, keyword)
        return listResult.then(listData => {
            return new SuccessModule(listData) //格式化数据
        })

    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(rows => {
            return new SuccessModule(rows[0])//返回的是一个数组
        })
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 登录失败
            return loginCheckResult
        }
        const author = req.session.username//传入用户名
        req.body.author = author
        const result = newBlog(req.body)
        return result.then((id)=>{
            return new SuccessModule(id)
        })
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 登录失败
            return loginCheckResult
        }
        const result = updateBlog(id, req.body)
        return result.then(val=>{
            if (val) {
                return new SuccessModule()
            } else {
                return new ErrorModule('更新博客失败')
            }
        })
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 登录失败
            return loginCheckResult
        }
        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(val=>{
            if (val) {
                return new SuccessModule()
            } else {
                return new ErrorModule('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter