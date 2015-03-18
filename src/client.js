var debug = require('debug')("holodex:client");

var React = require('react');
var Url = require('url');

var Ui = require('ui');
var config = require('config');
var router = require('router');
var fetcher = require('fetcher');

if (config.ui.debug) {
  localStorage.setItem("debug", "*");
} else {
  localStorage.removeItem("debug")
}

debug("UI starting with config:", config);

router.route(function (route) {
  debug("routing", route);

  var model = fetcher(route);

  debug('model', model)

  React.render(
    React.createElement(Ui, {
      config: config,
      route: route,
      model: model,
    }),
    document.querySelector('body > main')
  );
});
