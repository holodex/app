module.exports = {
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 5000
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
      pathname: '/',
    }
  }
}
