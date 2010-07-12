var Kraken = { objects: {} };

Kraken.Core = function (options) {
  options = options || {};

  this.pubsub = new Kraken.objects.PubSub();
  this.controllers = {};
  this._controllers = {};
  this.views = {};
  this.models = {};
}

Kraken.Core.prototype.context = function () {
  return { "pubsub": this.pubsub
         , "views": this.views
         };
};

Kraken.Core.prototype.start = function () {
  for (var k in this.controllers) {
    this._controllers[k] = new this.controllers[k](this.context());
  }

  this.pubsub.publish("/app/start", []);
};
if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.Controller = function () {};

Kraken.objects.Controller.prototype.views = {};
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
  console.log("publishing: " + ch)
  console.log(args);
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
if (typeof Kraken == "undefined") { Kraken = {};}
if (!Kraken.objects) { Kraken.objects = {}; }

Kraken.objects.View = function () {};

Kraken.objects.View.prototype.listeners = {};

Kraken.objects.View.prototype.bind = function (ev, f) {
  console.log("binding to: " + ev);
  if (!this.listeners[ev]) {
    this.listeners[ev] = []
  }

  this.listeners[ev].push(f);
};

Kraken.objects.View.prototype.trigger = function (ev, data) {
  console.log("triggering " + ev);
  if (this.listeners[ev]) {
    var li = this.listeners[ev].length;
    for (var i = 0; i < li; i++) {
      this.listeners[ev][i].apply(this, data);
    }
  }
};
