const path = require('path')
const fs = require('fs')
const md5 = require('md5')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ETag Demo</title>
  </head>
  <body>
    Hello ETag Demo
    <script src="/test.js"></script>
  </body>
  </html>`)
})

app.get('/test.js', (req, res) => {
  let sourcePath = path.resolve(__dirname, '../public/test.js')
  let result = fs.readFileSync(sourcePath)
  let etag = md5(result)

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, 'Not Modified')
    res.end()
  } else {
    res.setHeader('ETag', etag)
    res.writeHead(200, 'OK')
    res.end(result)
  }
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
