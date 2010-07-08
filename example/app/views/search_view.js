estately.views.Search = function (context) {
  var that = this;
  context.pubsub.subscribe("/map/loaded", function () {
    that.init();
  });
};

estately.views.Search.prototype.init = function (context) {
};

