if (typeof Kraken == "undefined") { Kraken = {}; }
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.PubSub = function () {
  this.channels = {};
}

Kraken.objects.PubSub.prototype.subscribe = function (ch, cb) {
  if (!this.channels[ch]) {
    this.channels[ch] = [];
  }
  this.channels[ch].push(cb);
};

Kraken.objects.PubSub.prototype.unsubscribeAll = function (ch) {
  if (ch) {
    this.channels[ch] = [];
  } else {
    this.channels = {};
  }
};

Kraken.objects.PubSub.prototype.unsubscribe 

Kraken.objects.PubSub.prototype.publish = function (ch, args) {
  if (!this.channels[ch]) {
    this.channels[ch] = [];
    return false;
  }

  var l = this.channels[ch].length;
  for (var i = 0; i < l; i++) {
    this.channels[ch][i].apply(null, args);
  }
};

if (typeof window === "undefined") {
  exports.PubSub = Kraken.objects.PubSub;
}
