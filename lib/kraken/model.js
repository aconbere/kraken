if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

var Model = Kraken.objects.Model = {};

Model.create = function (Con) {
  var count = 0;

  var f = function () {
    Con.prototype.constructor.apply(this, arguments);
    this.id = this.id || count;
    count = count + 1;
    f._all[this.id] = this;
  };

  // this implimentation optimizes for element lookup
  // if we wanted to optimize for retrieving the list
  // we could swap this to an array.
  //
  // we could also considet storing both and managing
  // syncronizing the two.
  f._all = {};

  f.all = function () {
    var c = [];
    for (var k in this._all) {
      if (this._all.hasOwnProperty(k)) {
        c.push(this._all[k]);
      }
    }
    return c;
  };

  f.find = function (id) {
    return this._all[id];
  };

  f.removeAll = function () {
    for (var k in f._all) {
      var i = f._all[k];
      if (i.remove) {
        i.remove();
      }
    }
    f._all = {};
  };

  f.prototype = Con.prototype;

  f.prototype._remove = function () {
    delete f._all[this.id];
  };

  return f;
};

if (typeof window == "undefined") {
  exports.Model = Model;
}
