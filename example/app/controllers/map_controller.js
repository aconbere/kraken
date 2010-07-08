estately.controllers.Map = function (context) {
  var that = this;
  context.pubsub.subscribe("/estately/start", function () {
    that.init(context);
  });
};

estately.controllers.Map.prototype = new Karken.objects.Controller();

estately.controllers.Map.prototype.init = function (context) {
  var bounds = context.bounds;
  var queryCenter = new google.maps.LatLng((bounds.minY + bounds.maxY) / 2, (bounds.minX + bounds.maxX) / 2);
  var map = new google.maps.Map(document.getElementById('gmap'), {
    center: context.center,
    zoom: 4,
    scrollwheel: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControlOptions: {position: google.maps.ControlPosition.LEFT},
    keyboardShortcuts: false
  });

  google.maps.event.addListener(map, "click", function (ev) {
    context.pubsub.publish("/map/click", ev);
  });

  google.maps.event.addListenerOnce(map, "bounds_changed", function (ev) {
    context.pubsub.subscribe("/map/loaded", map);
    that.afterLoad(bounds, context.page, context.location);
  });
};

estately.controllers.Map.prototype.afterLoad = function (bounds, page, loc) {
  // everything else
  var newBounds = new google.maps.LatLngBounds();
  newBounds.extend(new google.maps.LatLng(bounds.maxY, bounds.maxX));
  newBounds.extend(new google.maps.LatLng(bounds.minY, bounds.minX));
  map.fitBounds(newBounds);

  var onLocationSearchError = function () {
    Search.submit(newBounds, page);
    NotificationBar.show(Content.city_search_error_txt, $('map_notification'));
  };
  
  if (!loc) {
    EstatelyLog('running initial location_search');
    location_search(initial_location, initial_dist, {"skipOpenMap": true,
                                                     "force": true,
                                                     "onError": onLocationSearchError
                                                    });
  } else {
    Search.submit(mapBounds(), initial_page);
  }

  mapUpdateManager = new MapUpdateManager(0.02, map.getBounds(), map.getZoom());

  mapUpdateManager.onBoundsChanged(function (b, z) {
    Boundaries.outOfBounds(b);
    Search.submit(mapBounds());
  });

  google.maps.event.addListener(map, "dragstart", function () {
    context.allowUpdate = false;
  });

  google.maps.event.addListener(map, "dragend", function () {
    context.allowUpdate = true;
    mapUpdateManager.boundsChanged(map.getBounds(), map.getZoom());
  });

  google.maps.event.addListenerOnce(map, "idle", function () {
    google.maps.event.addListener(map, "bounds_changed", function () {
      mapUpdateManager.boundsChanged(map.getBounds(), map.getZoom());
    });
  });
};
