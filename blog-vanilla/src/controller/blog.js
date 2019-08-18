const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [{
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1565939063308,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1565939149545,
            author: 'lisi'
        },
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1565939063308,
        author: 'zhangsan'
    }
}

const newBlog = (postData = {})=>{
    console.log(postData);
    return {
        id:3 //新建博客，插到数据表里的id
    }
}

const updateBlog = (id,postData = {})=>{
    // console.log('update blog',id,postData);
    return true
}

const delBlog = (id)=>{
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}