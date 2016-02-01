require('babel-register')

const config = require('config/cli')(process.argv, 'render')
const createServer = require('./').createServer

const server = createServer(config)

server.listen(config.render.url.port)
