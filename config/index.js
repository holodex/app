const join = require('path').join

const configDir = __dirname
const nodeEnv = process.env.NODE_ENV || 'development'

const defaults = require(join(configDir, 'defaults'))
const envConfig = require(join(configDir, nodeEnv))

const config = Object.assign(
  {}, defaults, envConfig
)

module.exports = config
