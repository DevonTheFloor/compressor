const express = require('express')
const bodyParser = require('body-parser')
const testRoutes = require('./routes/test.js')
// const  urlencoded = require ('express');
// const  json = require ('express');

// route


const app = express()

// app.use(json({ limit: '5000mb' }));
//   app.use(urlencoded({ extended: true, limit: '5000mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//route
app.use('/api/test', testRoutes)

module.exports = app