const {getList,
        getDetail,
        newBlog,
        updateBlog,
        delBlog}= require('../controller/blog')
const {SuccessModule,ErrorModule} = require('../module/resModule')

const handleBlogRouter = (req,res)=>{
    const method = req.method//GET/POST
    const id = req.query.id//博客id

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
       const author = req.query.author||''
       const keyword = req.query.keyword||''
       const listData = getList(author,keyword)//获取数据
       return new SuccessModule(listData)//格式化数据
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const data = getDetail(id)
        return new SuccessModule(data)
    }
    // 新建一篇博客
    if(method === 'POST' && req.path ==='/api/blog/new'){
        const data = newBlog(req.body)
        return new SuccessModule(data)
    }
    // 更新一篇博客
    if(method === 'POST' && req.path ==='/api/blog/update'){
        const result = updateBlog(id,req.body)
        if(result){
            return new SuccessModule()
        }else{
            return new ErrorModule('更新博客失败')
        }
    }
    // 删除一篇博客
    if(method === 'POST' && req.path ==='/api/blog/del'){
        const result = delBlog(id)
        if(result){
            return new SuccessModule()
        }else{
            return new ErrorModule('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter