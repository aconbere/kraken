var KrakenUtils = {};

KrakenUtils.mixin = function (target, mixin) {
  for (var p in mixin) {
    if (mixin.hasOwnProperty(p)) {
      target[p] = mixin[p];
    }
  }
};

if (typeof window === "undefined") {
  exports.utils = KrakenUtils;
}
