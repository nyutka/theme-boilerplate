/******************/
/* Mapbox helpers */
/******************/

define([
    "jquery",
    "mapbox"
], function(
    $,
    L
) {
    var HEARSAY_ACCESS_TOKEN = "pk.eyJ1IjoibWZsZXNjaGxlciIsImEiOiJqOWxZSE8wIn0.VcRq5IxyVLXPzTOz9P2WGg";
    var DEFAULT_MARKER_SYMBOL = "circle";
    var DEFAULT_MARKER_COLOR = "ed1651";
    var DEFAULT_ZOOM_LEVEL = 15;
    var DEFAULT_MOBILE_WIDEST = 765;
    var initialized = false;

    var _initMapbox = function() {
        L.mapbox.accessToken = HEARSAY_ACCESS_TOKEN;
        initialized = true;
    };

    var _geocodeAddress = function(address, callback) {
        if(!initialized) {
            _initMapbox();
        }

        var geocoder = L.mapbox.geocoder("mapbox.places");
        geocoder.query(address, callback);
    };

    var showMap = function(address, containerID, options, markerClickHandler) {
        if(!this.initialized) {
            _initMapbox();
        }
        var map;
        options = options || {};
        map = L.mapbox.map(containerID, "mapbox.streets", options);
        map.scrollWheelZoom.disable();

        _geocodeAddress(address, function(err, data) {
            // The geocoder can return an area, like a city, or a
            // point, like an address. Here we handle both cases,
            // by fitting the map location to an area if we don't have a point.
            if (data.latlng) {
                map.setView(data.latlng, DEFAULT_ZOOM_LEVEL);
                // If we have a point, we can put a marker there.
                var destinationMarker = L.marker(data.latlng, {
                    icon: L.mapbox.marker.icon({
                        "marker-color": "#" + DEFAULT_MARKER_COLOR,
                        "marker-symbol": DEFAULT_MARKER_SYMBOL
                    })
                });
                if(markerClickHandler) {
                    destinationMarker.on("click", markerClickHandler);
                }
                destinationMarker.addTo(map);
            } else if (data.lbounds) {
                map.fitlocation(data.lbounds);
            }
        });
        return map;
    };

    var showSwappableMap = function(address, containerID, options, markerClickHandler) {
        if(this.map) {
            console.log("shomap", address, containerID, options, markerClickHandler);
            this.map.remove();
        }

        this.map = this.showMap(address, containerID, options, markerClickHandler);
    };

    var showStaticMap = function(address, containerID) {
        var container = $('#' + containerID);
        var containerHeight = container.innerHeight();

        _geocodeAddress(address, function(err, data) {
            var location;
            if(data.latlng) {
                location = data.latlng;
            } else if (data.lbounds) {
                location = data.lbounds.northEast;
            }
            // mapbox wants input to the static api the other way around from their geocoder output
            var locationString = location[1] + "," + location[0];
            var staticMapUrl = "url( 'https://api.mapbox.com/v4/mapbox.streets/" +
                "pin-m-" + DEFAULT_MARKER_SYMBOL + "+" + DEFAULT_MARKER_COLOR + "(" + locationString + ")/" +
                locationString + "," + DEFAULT_ZOOM_LEVEL + "/" + DEFAULT_MOBILE_WIDEST + "x" +
                containerHeight + ".png?access_token=" + HEARSAY_ACCESS_TOKEN + "' )";

            var styles = {
                "background-size": "cover",
                "background-position": "center",
                "background-image": staticMapUrl
            };
            container.css(styles);
        });
    };

    var exports = {};
    exports.showMap = showMap;
    exports.showSwappableMap = showSwappableMap;
    exports.showStaticMap = showStaticMap;

    return exports;
});
