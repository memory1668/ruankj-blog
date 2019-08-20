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

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        //    const listData = getList(author,keyword)//获取数据
        const listResult = getList(author, keyword)
        return listResult.then(listData => {
            return new SuccessModule(listData) //格式化数据
        })

    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(rows => {
            return new SuccessModule(rows[0])
        })
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const author = 'wangwu'//假数据，等开发登录功能时再使用真实的用户名
        req.body.author = author
        const result = newBlog(req.body)
        return result.then((id)=>{
            return new SuccessModule(id)
        })
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModule()
        } else {
            return new ErrorModule('更新博客失败')
        }
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModule()
        } else {
            return new ErrorModule('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter