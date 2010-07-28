var minitest = require("minitest");
var assert = require("assert");
var Model = require("../lib/kraken/model").Model;
var sys = require("sys");

minitest.context("Kraken.objects.Model.create", function () {
  this.setup(function () {
    this.M = Model.create(function (v) {
      this.name = v;
    });
    this.x = new this.M("x");
    this.y = new this.M("y");
  });

  this.assertion("should expose a function all that returns all instances", function (test) {
    var all = this.M.all()
    assert.equal(all.length, 2);
    assert.equal(all[0].id, 0);
    assert.deepEqual(all[0], this.x);
    assert.deepEqual(all[1], this.y);
    test.finished();
  });

  this.assertion("should expose a function find that returns an instance by id", function (test) {
    assert.deepEqual(this.M.find(0), this.x);
    assert.deepEqual(this.M.find(1), this.y);
    assert.equal(this.M.find(10), null);
    test.finished();
  });

  this.assertion("should expose a function removeAll that resets .all", function (test) {
    this.M.removeAll();
    assert.deepEqual(this.M.all(), {});
    test.finished();
  });

  this.assertion("should expose a function _remove on an instance that removes it from all", function (test) {
    this.x._remove();
    assert.equal(this.M.find(this.x.id), null);
    test.finished();
  });
});
