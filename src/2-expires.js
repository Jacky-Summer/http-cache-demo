const path = require('path')
const fs = require('fs')
const moment = require('moment')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expires Demo</title>
  </head>
  <body>
    Hello Expires Demo
    <script src="/test.js"></script>
  </body>
  </html>`)
})

app.get('/test.js', (req, res) => {
  let sourcePath = path.resolve(__dirname, '../public/test.js')
  let result = fs.readFileSync(sourcePath)
  res.setHeader(
    'Expires',
    moment().utc().add(1, 'm').format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
  ) // 2分钟
  res.end(result)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
