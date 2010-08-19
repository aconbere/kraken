var minitest = require("minitest");
var assert = require("assert");
var Kraken = require("../lib/kraken").Kraken;
var sys = require("sys");

minitest.context("Kraken.Core", function () {
  this.setup(function () {
    var X = function () { this.name = "X" }
    prototype = new Kraken.objects.Controller();

    var Y = function () { this.name = "Y" };
    Y.prototype = new Kraken.objects.Controller();

    this.k = new Kraken.Core({ "controllers": { "X": X, "Y": Y } });
  });
  
  this.assertion("start should find a set of controllers and initialize them", function (test) {
    this.k.start();
    assert.equal(this.k.controllers.X.name, "X");
    assert.equal(this.k.controllers.Y.name, "Y");
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
