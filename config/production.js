var config = {
  isDev: false,
  isSecure: false,
  data: {
    root: __dirname + "/../data",
  },
  session: {
    host: "localhost",
    port: 6379,
    db: 1,
    secret: "meow:3",
    secure: false,
  },
  api: {
    protocol: "http",
    hostname: "craftodex2.enspiral.info",
    port: process.env.PORT,
    prefix: "/api",
  },
  ui: {
    debug: true,
    prefix: "/",
    pushState: true,
    hash: false,
  },
};

module.exports = config;
