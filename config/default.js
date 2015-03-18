var config = {
  isSecure: false,
  data: {
    location: __dirname + "/../data",
  },
  session: {
    host: "localhost",
    port: 6379,
    db: 1,
    secret: "bang!",
    secure: false,
  },
  // TODO make api.url props
  api: {
    protocol: "http",
    hostname: "localhost",
    port: 3000,
    pathname: "/api",
  },
  // TODO make ui.router and ui.url props
  ui: {
    debug: true,
    prefix: "/",
    pushState: true,
    hash: false,
  },
};

module.exports = config;
