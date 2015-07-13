var fs = require('fs')

var config = {
  url: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000
  },
  data: {
    db: 'yml',
    localDir: __dirname + '/../data',
    email: "31338047380-lndnfeihifv0ibtiic8aa36a9ea2h7m5@developer.gserviceaccount.com",
    key: fs.readFileSync(__dirname + "/sheet-key.pem"),
    scopes: ["https://spreadsheets.google.com/feeds"],
    spreadsheet: "1977Tds2k0c05LcRc3fu8JuF-oZMuDWp4pL8T70UY_5k",
    worksheets: {
      groups: '1',
      people: '2',
      roles: '3',
      roleTypes: '7',
      relationshipTypes: '6',
      linkTypes: '8',
      relationships: '4'
    }
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
