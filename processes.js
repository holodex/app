module.exports = {
  apps: [{
    name: "holodex",
    script: "src/server.js",
    watch: process.env.NODE_ENV === 'development'
  }]
}
