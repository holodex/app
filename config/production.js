module.exports = {
  url: {
    protocol: 'http',
    hostname: 'holodex.enspiral.info',
    port: process.env.PORT
  },
  data: {
    gitRepoUrl: 'git://github.com/holodex/enspiral-data.git',
    localDir: __dirname + '/../data',
    cronSpec: '*/15 * * * *'
  }
}
