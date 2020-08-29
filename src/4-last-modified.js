const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Last Modified Demo</title>
  </head>
  <body>
    Hello Last Modified Demo
    <script src="/test.js"></script>
  </body>
  </html>`)
})

app.get('/test.js', (req, res) => {
  let sourcePath = path.resolve(__dirname, '../public/test.js')
  let result = fs.readFileSync(sourcePath)
  let status = fs.statSync(sourcePath)
  console.log(status, req.headers['if-modified-since'])
  let lastModified = status.mtime.toUTCString()
  if (lastModified === req.headers['if-modified-since']) {
    res.writeHead(304, 'Not Modified')
    res.end()
  } else {
    res.setHeader('Cache-Control', 'max-age=1') // 设置1秒后过期以方便我们马上能用Last-Modified判断
    res.setHeader('Last-Modified', lastModified)
    res.writeHead(200, 'OK')
    res.end(result)
  }
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
