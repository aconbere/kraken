if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.View = function () {};

Kraken.objects.View.prototype.bind = function (ev, f) {
  if (!this.listeners[ev]) {
    this.listeners[ev] = [];
  }

  this.listeners[ev].push(f);
};

Kraken.objects.View.prototype.trigger = function (ev, data) {
  if (this.listeners[ev]) {
    var li = this.listeners[ev].length;
    for (var i = 0; i < li; i++) {
      this.listeners[ev][i].apply(this, data);
    }
  }
};
