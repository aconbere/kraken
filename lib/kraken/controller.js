if (typeof Kraken == "undefined") { Kraken = {}; }
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.Controller = function (context) {
  this.views = {};
  //context.subscribe("start", function() { that.init(); });
};
