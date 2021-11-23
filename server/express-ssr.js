const express = require('express')
const path = require('path')
const fs = require('fs')

const server = express()

// 1 创建vue实例
const Vue = require('vue')
// 2 获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

// 处理favicon
// const favicon = require('serve-favicon')
// server.use(favicon(path.join(__dirname,'../src/public','favicon.ico')))

// 编写路由处理请求
server.get('*', (req, res) => {
  console.log(req.url)

  // 解析模板名称 /user
  const template = req.url.substr(1) || 'index'

  // 加载模板
  const buffer = fs.readFileSync(path.join(__dirname,`${template}.html`))

  const app = new Vue({
    template: buffer.toString(),
    data(){
      return {msg: 'vue ssr'}
    }
  })

  renderer.renderToString(app).then(html => {
    res.send(html)
  }).catch(err => {
    res.status(500)
    res.send('Internal Server Error, 500!')
  })
})

server.listen(80, () => {
  console.log('server start....')
})