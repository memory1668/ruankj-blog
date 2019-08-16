const http = require('http')
const serverHandle = require('../app')

const PORT = 3000

const server = http.createServer(serverHandle)
server.listen(PORT,'127.0.0.1',()=>{
    console.log('server started at 127.0.0.1:3000');
    
})