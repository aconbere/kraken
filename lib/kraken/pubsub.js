if (typeof Kraken == "undefined") { Kraken = {}; }
if (!Kraken.objects) { Kraken.objects = {}; }

var PubSub = Kraken.objects.PubSub = function () {
  this.listeners = {};
};

PubSub.prototype.bind = function (ch, cb) {
  if (!this.listeners[ch]) {
    this.listeners[ch] = [];
  }
  this.listeners[ch].push(cb);
};

PubSub.prototype.unbindAll = function (ch) {
  if (ch) {
    this.listeners[ch] = [];
  } else {
    this.listeners = {};
  }
};

PubSub.prototype.unbind = function () {};

PubSub.prototype.trigger = function (ch, args) {
  args = args || [];

  if (!this.listeners[ch]) {
    this.listeners[ch] = [];
    return false;
  }

  var l = this.listeners[ch].length;
  for (var i = 0; i < l; i++) {
    this.listeners[ch][i].apply(null, args);
  }
};

if (typeof window === "undefined") {
  exports.PubSub = PubSub;
}
