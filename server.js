const http = require('http')
const app = require('./app')
const nport = 3333


// eslint-disable-next-line no-undef
app.set('port', process.env.PORT || nport)
const server = http.createServer(app)
console.log(`Connecté au port ${nport}`)

// eslint-disable-next-line no-undef
server.listen( process.env.PORT || nport)