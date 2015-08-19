var nodeEnv = process.env.NODE_ENV

var isProd = nodeEnv === 'production'

module.exports = {
  services: [
    'api',
    'ui',
    'bundle',
    'less',
    'assets'
  ],
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    pathname: '/'
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
  },
  bundle: {
    debug: !isProd,
    cache: isProd,
    minify: isProd
  }
}
