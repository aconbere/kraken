var minitest = require("minitest");
var assert = require("assert");
var Kraken = require("../lib/kraken").Kraken;
var sys = require("sys");

minitest.context("Kraken.Core", function () {
  this.setup(function () {
    this.k = new Kraken.Core();
    this.k.controllers.X = function () { this.name = "X" }
    this.k.controllers.X.prototype = new Kraken.objects.Controller();
    this.k.controllers.Y = function () { this.name = "Y" };
    this.k.controllers.Y.prototype = new Kraken.objects.Controller();
  });
  
  this.assertion("start should find a set of controllers and initialize them", function (test) {
    this.k.start();
    assert.equal(this.k._controllers.X.name, "X");
    assert.equal(this.k._controllers.Y.name, "Y");
    test.finished();
  });

  this.assertion("start should fire /app/start", function (test) {
    var fired = false;
    this.k.pubsub.bind("/app/start", function () { fired = true });
    this.k.start();
    assert.ok(fired);
    test.finished();
  });
});
