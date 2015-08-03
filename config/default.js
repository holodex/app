module.exports = {
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000
  },
  data: {
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
