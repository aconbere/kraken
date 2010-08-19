if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

var Controller = Kraken.objects.Controller = function () {};

Controller.prototype.views = function (name) {
  return this.context.views[name];
};

Controller.prototype.models = function (name) {
  return this.context.models[name];
};

if (typeof window === "undefined") {
  exports.Controller = Controller;
}
