module.exports = {
  url: {
    protocol: 'http',
    hostname: 'holodex.enspiral.com',
    port: process.env.PORT
  },
  data: {
    db: 'git',
    remoteUrl: 'git://github.com/holodex/enspiral-data',
    localDir: __dirname + '/../data',
    cronSpec: '*/2 * * * *'
  }
}
