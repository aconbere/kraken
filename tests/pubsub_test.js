var minitest = require("minitest");
var assert = require("assert");
var PubSub = require("../lib/kraken/pubsub").PubSub;
var sys = require("sys");

minitest.context("Kraken.objects.PubSub", function () {
  this.setup(function () {
    this.pubsub = new PubSub();
  });
  
  this.assertion("intialization should create an empty channels hash", function (test) {
    assert.deepEqual(this.pubsub.listeners, {});
    test.finished();
  });

  this.assertion("subscribe should add a listener to a channel", function (test) {
    this.pubsub.bind("x", function () {});
    assert.ok(this.pubsub.listeners.x);
    test.finished();
  });

  this.assertion("publish should send a message to each listener on a channel", function (test) {
    var fired = false;
    var fired2 = false
    this.pubsub.bind("x", function () { fired = true });
    this.pubsub.bind("x", function () { fired2 = true });
    this.pubsub.trigger("x");
    assert.ok(fired);
    assert.ok(fired2);
    test.finished();
  });
});
