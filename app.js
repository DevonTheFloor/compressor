const express = require('express')
const icr = require('./lib/image-resize-compress')

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
// eslint-disable-next-line no-unused-vars
app.use('/test/', (req, res, next) => {
  icr.urlToBlob('https://upload.wikimedia.org/wikipedia/commons/3/34/Renault_T-Truck_-_E_5958KC.jpg').then((file) => console.log(file))})
//auth

module.exports = app