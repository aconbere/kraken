estately.views.Boundary = function (context) {
  var that = this;
  context.pubsub.subscribe("/start", function () {
    that.init(context);
  });
};

estately.views.Boundary.prototype = new Kraken.objects.View();

estately.views.Boundary.prototype.init = function (context) {
  this.context = context;
  context.pubsub.subscribe("/destroyed", function () {
    that.setSearchPoly("");
  });
};

estately.views.Boundary.prototype.setSearchPoly = function (ewkt) {
  $J("#search_poly").val("");
}
