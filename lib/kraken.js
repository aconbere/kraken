var Kraken = { objects: {}
             , version: "0.0.1"
             };

Kraken.Core = function (options) {
  options = options || {};

  this.pubsub = new Kraken.objects.PubSub();
  this.controllers = {};
  this._controllers = {};
  this.views = {};
  this.models = {};
}

Kraken.Core.prototype.context = function () {
  return { "pubsub": this.pubsub
         , "views": this.views
         };
};

Kraken.Core.prototype.start = function () {
  for (var k in this.controllers) {
    this._controllers[k] = new this.controllers[k](this.context());
  }

  this.pubsub.publish("/app/start", []);
};
