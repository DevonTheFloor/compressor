const express = require('express')
const testRoutes = require('./routes/test')
const formatRoutes = require('./routes/format')
// route


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.json())

//route
app.use('/api/test', testRoutes)
app.use('/api/onepic', formatRoutes)

//auth

module.exports = app