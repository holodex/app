const vas = require('vas')

const service = require('app/service')
const config = require('./config')

vas.listen(service, config, {
  port: config.port
})

