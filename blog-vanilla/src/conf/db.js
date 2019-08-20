const env = process.env.NODE_ENV //环境参数

//配置(根据开发环境返回不同的数据库配置)
let MYSQL_CONF ={
    host:'localhost',
    user:'root',
    password:'888888',
    port:'3306',
    database:'myblog'
}
// if (env === 'env') {
//     MYSQL_CONF = {
//         host:'localhost',
//         user:'root',
//         password:'888888',
//         port:'3306',
//         database:'myblog'
//     }
// }

// if(env === 'production'){
//     MYSQL_CONF = {
//         host: 'localhost',
//         user: 'root',
//         password: '888888',
//         port: '3306',
//         database: 'myblog'
//     }
// }

module.exports = {
    MYSQL_CONF
}