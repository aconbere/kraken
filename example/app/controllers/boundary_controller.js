estately.controllers.Boundary = function (context) {
  var that = this;
  context.pubsub.subscribe("/estately/start", function () {
    that.init(context);
  });
};

estately.controllers.Boundary.prototype = new Karken.objects.Controller();

estately.controllers.Boundary.prototype.init = function (context) {
  context.pubsub.subscribe("/map/bounds/update", function (bounds) {
    var l = context.boundaries.length;
    for (var i = 0; i < l; i++) {
      var b = context.boundaries[i];
      if (bounds.intersect(b.bounds) {
        b.destroy();
      }
    }

    if (context.boundaries.length <= 0) {
      context.pubsub.publish("/map/boundaries/destroyed");
    }
  });
};
