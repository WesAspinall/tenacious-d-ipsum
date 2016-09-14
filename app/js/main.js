(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
  var template = Handlebars.template,
      templates = Handlebars.templates = Handlebars.templates || {};
  templates['groceries'] = template({ "1": function _(container, depth0, helpers, partials, data) {
      return "    <div class='grocery-item'>\n    <p>Item: " + container.escapeExpression(container.lambda(depth0 != null ? depth0.item : depth0, depth0)) + "</p>\n";
    }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
      var stack1;

      return (stack1 = helpers.each.call(depth0 != null ? depth0 : {}, depth0 != null ? depth0.groceries : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "";
    }, "useData": true });
})();

},{}],2:[function(require,module,exports){
'use strict';

require('./groceries.js');

'use-strict';

(function () {

  var template = Handlebars.templates['groceries'];

  var context = {
    groceries: [{ item: "Potato" }, { item: "Rice" }, { item: "Beans" }, { item: "Chicken" }]
  };

  var templateData = template(context);

  document.getElementById('grocery-list').innerHTML += templateData;
})();

},{"./groceries.js":1}]},{},[2])


//# sourceMappingURL=main.js.map
