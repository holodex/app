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
var fetcher = require('fetcher');

domready(function () {
  router.route(function (route) {
    debug("routing", route);

    var model = fetcher(route);

    React.render(
      React.createElement(Ui, {
        config: config,
        route: route,
        model: model,
      }),
      document.body
    );
  })
});
