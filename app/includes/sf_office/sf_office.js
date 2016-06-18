var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var MapTools = require("../../js/common/map-tools.js");
var htmlTemplate = require("./sf_office.html");
var callback = function() {
    var suboffices = JSContext.getProfile().suboffices;
    var $viewMap = $('#view-map');
    var currentKey = 0;

    updateMap();

    $('.office-tabs a[data-toggle="tab"]').off().on('shown.bs.tab', function (e) {
        currentKey = $(e.target).data('key');
        updateMap();
    });

    function updateMap() {
        $viewMap.attr('href', getGoogleMap());
        MapTools.showSwappableMap(getAddress(), 'map-container', {}, markerClickHandler);
    }

    function markerClickHandler() {
        var marker = this;
        if (!marker.getPopup()) {
            var href = getGoogleMap();
            var address = getAddress();
            var content = '<a target="_blank" href="'+ href +'">' + address + '</a>';
            marker.bindPopup(content).openPopup();
        }
    }

    function getGoogleMap() {
        return 'http://maps.google.com/?q=' + encodeURIComponent(getAddress());
    }
    function getAddress() {
        var office = suboffices[currentKey];
        return office.street + ', ' + office.city + ' ' + office.state + ', ' + office.zip_code;
    }
};
module.exports = {
    load: function() {
        var args = {
            id: "sf_office",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}