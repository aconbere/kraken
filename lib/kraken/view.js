if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

if (typeof window === "undefined") {
  var Evented = require("evented").Evented;
}

var View = Kraken.objects.View = function () {
  this.listeners = {};
};

View.prototype = new Evented();

if (typeof window === "undefined") {
  exports.View = View;
}
