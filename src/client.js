var debug = require('debug')("craftodex");
var domready = require('domready');

var React = require('react');
var Url = require('url');

var Ui = require('ui');
var config = require('uiconfig');
var router = require('router');
var fetcher = require('fetcher');

if (config.debug) {
  localStorage.setItem("debug", "*");
} else {
  localStorage.removeItem("debug")
}

debug("UI starting with config:", config);

router.route(function (route) {
  debug("routing", route);

  //var model = fetcher(route);

  React.render(
    React.createElement(Ui, {
      config: config,
      route: route,
      //model: model,
    }),
    document.querySelector('body > main')
  );
});
