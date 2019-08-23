const env = process.env.NODE_ENV //环境参数

// 配置(根据开发环境返回不同的数据库配置)
let MYSQL_CONF = {}
let REDIS_CONF = {}
// mysql
MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '888888',
    port: '3306',
    database: 'myblog'
}
// redis
REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1'
}
// if (env === 'dev') {
//     // mysql
//     MYSQL_CONF = {
//         host:'localhost',
//         user:'root',
//         password:'888888',
//         port:'3306',
//         database:'myblog'
//     }
//     // redis
//     REDIS_CONF = {
//         port:'6379',
//         host:'127.0.0.1'
//     }
// }

// if(env === 'production'){
//     // mysql
//     MYSQL_CONF = {
//         host: 'localhost',
//         user: 'root',
//         password: '888888',
//         port: '3306',
//         database: 'myblog'
//     }
//     // redis
//     REDIS_CONF = {
//         port:'6379',
//         host:'127.0.0.1'
//     } 
// }

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}