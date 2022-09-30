require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`<h1>It Works - Updated</h1>`)
})
const APP_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080
app.listen(APP_PORT, () => {
  console.log(`Service running on port ${APP_PORT}`)
})
module.exports = app