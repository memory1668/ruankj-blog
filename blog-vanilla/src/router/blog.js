const {getList}= require('../controller/blog')
const {SuccessModule,ErrorModule} = require('../module/resModule')

const handleBlogRouter = (req,res)=>{
    const method = req.method//GET/POST

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
       const author = req.query.author||''
       const keyword = req.query.keyword||''
       const listData = getList(author,keyword)//获取数据
       return new SuccessModule(listData)//格式化数据
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        return {
            msg: '这是获取博客详情的接口'
        }
    }
    // 新建一篇博客
    if(method === 'POST' && req.path ==='/api/blog/new'){
        return {
            msg: '这是新建一篇博客的接口'
        }
    }
    // 更新一篇博客
    if(method === 'POST' && req.path ==='/api/blog/update'){
        return {
            msg: '这是更新一篇博客的接口'
        }
    }
    // 删除一篇博客
    if(method === 'POST' && req.path ==='/api/blog/del'){
        return {
            msg: '这是删除一篇博客的接口'
        }
    }
}

module.exports = handleBlogRouter