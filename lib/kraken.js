var Kraken = { objects: {}
             , version: "0.0.1"
             };

if (typeof window === "undefined") {
  var Evented = require("evented").Evented;
  Kraken.objects.Controller = require("./kraken/controller").Controller;
  Kraken.objects.View = require("./kraken/view").View;
  Kraken.objects.Model = require("./kraken/model").Model;
  Kraken.utils = require("./kraken/utils").utils;
}

// All applications are instances of Kraken Core
Kraken.Core = function (options) {
  this.options = options || {};
  this.options.views = this.options.views || {};
  this.options.models = this.options.models || {};
  this.options.pubsub = this.options.pubsub || new Evented();

  // this is basically an easy accessor property
  this.pubsub = this.options.pubsub;
  this.controllers = {};
};

// Overwriteable allows for application state
// to be passed to controllers
Kraken.Core.prototype.context = function () {
  return this.options;
};

// On start kraken initializes all controllers with context()
Kraken.Core.prototype.start = function () {
  var controllers = this.options.controllers;
  for (var k in controllers) {
    if (controllers.hasOwnProperty(k)) {
      var controller = new controllers[k](this.context());
      this.controllers[k] = controller;
    }
  }

  this.pubsub.trigger("/app/start");
};


Kraken.utils = {};
Kraken.utils.mixin = function (target, mixin) {
  for (var p in mixin) {
    if (mixin.hasOwnProperty(p)) {
      target[p] = mixin[p];
    }
  }
};

if (typeof window === "undefined") {
  exports.Kraken = Kraken;
}
