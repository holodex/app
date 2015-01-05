var _ = require('lodash');
var debug = require('debug')("craftodex");
var config = require('clientconfig');

if (config.debug) {
  localStorage.setItem("debug", "*");
} else {
  localStorage.removeItem("debug")
}

debug("UI started with config:", config);
