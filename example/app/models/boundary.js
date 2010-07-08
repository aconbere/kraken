/*jslint white: true, laxbreak: true, indent: 2 */
var Boundaries = { polygons: {}
                 , ewkt: null
                 , outOfBoundsCallbacks: []
                 };

Boundaries.add = function (type, polygons, fullMap) {
  this.polygons[type] = this.polygons[type] || [];

  for (var i = 0; i < polygons.length; i++) {
    var p = polygons[i];

    if (fullMap) {
      p.setOptions({ fillOpacity: 0 });
    }

    p.setMap(map);
    this.polygons[type].push(p);
  }
};

Boundaries.clear = function (type) {
  if (type) {
    for (var i = 0; i < this.polygons[type].length; i++) {
      this.polygons[type][i].setMap(null);
    }
    delete this.polygons[type];
  } else {
    for (var t in this.polygons) {
      Boundaries.clear(t);
    }
  }

  this.ewkt = null;
};

Boundaries.inMapBounds = function (type, bounds) {
  if (!this.polygons[type]) {
    return false;
  }
  return bounds.intersects(Boundaries.toBounds(this.polygons[type]));
};

Boundaries.outOfBounds = function (bounds) {
  if (!Boundaries.inMapBounds("outer", bounds)) {
    Boundaries.clear();

    var l = this.outOfBoundsCallbacks.length;
    for (var i = 0; i < l; i++) {
      this.outOfBoundsCallbacks[i]();
    }
  }
};

Boundaries.onOutOfBounds = function (func) {
  this.outOfBoundsCallbacks.push(func);
};

Boundaries.toBounds = function (polygons) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < polygons.length; i++) {
    var paths = polygons[i].getPaths();
    paths.forEach(function (path) {
      path.forEach(function (point) {
        bounds.extend(point);
      });
    });
  }
  return bounds;
};

var polygonFromJson = function (data) {
  var lineString = function (coordinates) {
    var path = [];
    var l = coordinates.length;
    for (var j = 0; j < l; j++) {
      path.push(new google.maps.LatLng(coordinates[j][1], coordinates[j][0]));
    }
    return path;
  };

  var polygon = function (multiCoordinates) {
    var paths = [];
    var l = multiCoordinates.length;
    for (var i = 0; i < l; i++) {
      paths.push(lineString(multiCoordinates[i]));
    }
    return paths;
  };

  var defaultOpts = { strokeColor: "#333333",
                      strokeOpacity: 0.6,
                      fillOpacity: 0.10
                    };

  var result = [];
  if (data.type == "multiPolygon") {
    for (var i = 0; i < data.coordinates.length; i++) {
      defaultOpts.paths = polygon(data.coordinates[i]);
      result.push(new google.maps.Polygon(defaultOpts));
    }
  } else if (data.type == "polygon") {
    defaultOpts.paths = polygon(data.coordinates);
    result.push(new google.maps.Polygon(defaultOpts));
  } 

  return result;
};
