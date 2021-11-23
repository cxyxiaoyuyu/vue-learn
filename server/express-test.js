const express = require('express')

const  server = express()

// 编写路由处理请求
server.get('/',(req,res)=>{
  res.send('<strong>hello world nodemon</strong>')
})

server.listen(80,()=>{
  console.log('server start....')
})