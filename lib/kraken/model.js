if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.Model = {};
Kraken.objects.Model.create = function (Con) {
  var count = 0;

  var f = function () {
    Con.prototype.constructor.apply(this, arguments);
    count = count + 1;
    this.id = this.id || count;
    f._all.push(this);
    this.create();
  }

  f._all = [];

  f.all = function () {
    return f._all;
  };

  f.prototype.create = function () {};
  f.prototype.destroy = function () {};
  f.prototype.refresh = function () {};
  f.prototype.getData = function () {};
  f.toJSON = function () { return {"id": this.id}; };
  f.prototype = Con.prototype;
  return f;
};

if (typeof window == "undefined") {
  exports.Model = Kraken.objects.Model;
}
