if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

if (typeof window === "undefined") {
  var PubSub = require("./pubsub").PubSub;
}

var View = Kraken.objects.View = function () {
  this.listeners = {};
};

View.prototype = new PubSub();

if (typeof window === "undefined") {
  exports.View = View;
}
