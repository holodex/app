var fs = require('fs')

var config = {
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000
  },
  data: {
    localDir: __dirname + '/../data',
    email: "31338047380-lndnfeihifv0ibtiic8aa36a9ea2h7m5@developer.gserviceaccount.com",
    key: fs.readFileSync(__dirname + "/sheet-key.pem"),
    scopes: ["https://spreadsheets.google.com/feeds"],
    location: "1977Tds2k0c05LcRc3fu8JuF-oZMuDWp4pL8T70UY_5k/od6"
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
