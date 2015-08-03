var defined = require('defined')

var env = process.env
var nodeEnv = env.NODE_ENV

module.exports = {
  apps: [{
    name: "holodex",
    script: "src/server.js",
    watch: nodeEnv === 'development',
    env: {
      NODE_ENV: defined(nodeEnv, 'production'),
      NODE_CONFIG_STRICT_MODE: '' // https://github.com/lorenwest/node-config/wiki/Strict-Mode
    }
  }]
}
