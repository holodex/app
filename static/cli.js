require('babel-register')

const config = require('config/cli')(process.argv, 'static')
const createStatic = require('./')

const server = createStatic(config.static)

server.listen(config.static.url.port)
