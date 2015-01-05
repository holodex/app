var config = {
  isDev: true,
  isSecure: false,
  data: {
    root: __dirname + "/../data",
  },
  session: {
    host: "localhost",
    port: 6379,
    db: 1,
    secret: "bang!",
    secure: false,
  },
  api: {
    protocol: "http",
    hostname: "localhost",
    port: 3000,
    pathname: "/api",
  },
  ui: {
    debug: true,
  },
};

module.exports = config;
