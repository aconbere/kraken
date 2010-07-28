if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

var Controller = Kraken.objects.Controller = function () {
  this.views = {};
};

if (typeof window === "undefined") {
  exports.Controller = Controller;
}
