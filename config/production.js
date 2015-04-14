var config = {
  isSecure: false,
  data: {
    gitRepoUrl: 'git://github.com/holodex/enspiral-data.git',
    localDir: __dirname + '/../data',
    cronSpec: '*/15 * * * *'
  },
  session: {
    host: 'localhost',
    port: 6379,
    db: 1,
    secret: 'meow:3',
    secure: false
  },
  api: {
    protocol: 'http',
    hostname: 'holodex.enspiral.info',
    port: process.env.PORT,
    prefix: '/api'
  },
  ui: {
    prefix: '/',
    pushState: true,
    hash: false
  }
}

module.exports = config
