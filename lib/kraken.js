var Kraken = { objects: {}
             , version: "0.0.1"
             };

if (typeof window === "undefined") {
  Kraken.objects.PubSub = require("./kraken/pubsub").PubSub;
  Kraken.objects.Controller = require("./kraken/controller").Controller;
  Kraken.objects.View = require("./kraken/view").View;
  Kraken.objects.Model = require("./kraken/view").Model;
}

Kraken.loggers = {};
Kraken.loggers.silent = { _log: []
                        , _warn: []
                        , _error: []
                        };

Kraken.loggers.silent.log = function (msg) {
  this._log.push(msg);
};

Kraken.loggers.silent.warn = function (msg) {
  this._warn.push(msg);
};

Kraken.loggers.silent.error = function (msg) {
  this._error.push(msg);
};

// All applications are instances of Kraken Core
Kraken.Core = function (options) {
  options = options || {};

  this.pubsub = new Kraken.objects.PubSub();
  this.controllers = {};
  this._controllers = {};
  this.models = {};
};

// Overwriteable allows for application state
// to be passed to controllers
Kraken.Core.prototype.context = function () {
  return { "pubsub": this.pubsub };
};

// On start kraken initializes all controllers with context()
Kraken.Core.prototype.start = function () {
  for (var k in this.controllers) {
    if (this.controllers.hasOwnProperty(k)) {
      this._controllers[k] = new this.controllers[k](this.context());
    }
  }

  this.pubsub.trigger("/app/start", []);
};

if (typeof console !== "undefined") {
  Kraken.logger = Kraken.Core.prototype.logger = console;
} else {
  Kraken.logger = Kraken.Core.prototype.logger = Kraken.loggers.silent;
}

if (typeof window === "undefined") {
  exports.Kraken = Kraken;
}
