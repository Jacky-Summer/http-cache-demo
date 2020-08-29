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
    <title>Init Demo</title>
  </head>
  <body>
    Hello Init Demo
    <script src="/test.js"></script>
  </body>
  </html>`)
})

app.get('/test.js', (req, res) => {
  let sourcePath = path.resolve(__dirname, '../public/test.js')
  let result = fs.readFileSync(sourcePath)
  res.end(result)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
