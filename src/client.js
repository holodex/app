var debug = require('debug')("craftodex");
var config = require('clientconfig');
var domready = require('domready');

if (config.debug) {
  localStorage.setItem("debug", "*");
} else {
  localStorage.removeItem("debug")
}

debug("UI starting with config:", config);

var React = require('react');
var Url = require('url');

var Ui = require('ui');
var router = require('router');

domready(function () {
  router.location(function (href) {
    debug("rendering", href);

    React.render(
      React.createElement(Ui, {
        path: Url.parse(href).path,
        config: config,
      }),
      document.body
    );
  })
});
