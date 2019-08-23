const http = require('http')
const serverHandle = require('../app')

const PORT = 3000

const server = http.createServer(serverHandle)
server.listen(PORT,'localhost',()=>{
    console.log('server started at localhost:3000');
    
})