require('babel-register')

const config = require('config/cli')(process.argv, 'api')
const createServer = require('./').createServer

const server = createServer(config.api)

server.listen(config.api.url.port)
