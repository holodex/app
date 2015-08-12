module.exports = {
  data: {
    db: 'git',
    remoteUrl: 'git://github.com/holodex/enspiral-data',
    branch: 'csv',
    localDir: __dirname + '/../data',
    cronSpec: '*/2 * * * *'
  }
}
