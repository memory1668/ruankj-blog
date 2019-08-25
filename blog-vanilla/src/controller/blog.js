const {
    exec,
    escape
} = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    if(author){//用户名非空
        author = escape(author)
    }
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = ${author} `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    console.log(sql)
    return exec(sql)
}

const getDetail = (id) => {
    id = escape(id)
    const sql = `select * from blogs where id = ${id}`
    return exec(sql)
}

const newBlog = (postData = {}) => {
    const title = xss(escape(postData.title))
    const content = xss(escape(postData.content))
    const createtime = Date.now()
    const author = escape(postData.author)
    const sql = `insert into blogs(title,content,createtime,author)
                    values(${title},${content},'${createtime}',${author})
   `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, postData = {}) => {
    const title = xss(escape(postData.title))
    const content = xss(escape(postData.content))
    id = escape(id)
    const sql = `update blogs set title=${title},content=${content} where id =${id}`
    return exec(sql).then(updateData => {
        return updateData.affectedRows > 0 ? true : false
    })
}

const delBlog = (id, author) => {
    id = escape(id)
    author = escape(author)
    const sql = `delete from blogs where id=${id} and author=${author}`
    return exec(sql).then(deleteData => {
        return deleteData.affectedRows > 0 ? true : false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}