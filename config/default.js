module.exports = {
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000
  },
  data: {
    db: 'fs',
    localDir: __dirname + '/../data'
  },
  api: {
    url: {
      pathname: '/api'
    }
  },
  ui: {
    router: {
      pushState: true,
      hash: false
    },
    url: {
      pathname: '/'
    }
  }
}
