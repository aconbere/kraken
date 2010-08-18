if (typeof window === "undefined") {
  var Evented = require("evented").Evented;
}

if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

var View = Kraken.objects.View = function () {};

View.prototype = new Evented();

if (typeof window === "undefined") {
  exports.View = View;
}
