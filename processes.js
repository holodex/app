module.exports = {
  apps: [{
    name: "holodex",
    script: "src/server.js",
    watch: process.env.NODE_ENV === 'development',
    env: {
      NODE_ENV: process.env.NODE_ENV,
      NODE_CONFIG_STRICT_MODE: '' // https://github.com/lorenwest/node-config/wiki/Strict-Mode
    }
  }]
}
