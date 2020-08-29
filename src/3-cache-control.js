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
    <title>Cache-Control Demo</title>
  </head>
  <body>
    Hello Cache-Control Demo
    <script src="/test.js"></script>
  </body>
  </html>`)
})

app.get('/test.js', (req, res) => {
  let sourcePath = path.resolve(__dirname, '../public/test.js')
  let result = fs.readFileSync(sourcePath)
  // res.setHeader('Cache-Control', 'max-age=60') // 设置相对时间-60秒过期
  res.setHeader('Cache-Control', 'no-store, max-age=60') // 禁止缓存
  res.end(result)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
