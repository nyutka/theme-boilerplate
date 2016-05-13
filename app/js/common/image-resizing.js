define([
    "underscore",
    "./utils"
], function(
    _,
    utils
) {

    // Matches AVAILABLE_WIDTHS list in poly/public/templatetags/image_resizing.py
    var AVAILABLE_WIDTHS = [
        25,
        50,
        60,
        100,
        154,
        200,
        205,
        300,
        365,
        400,
        800
    ];

    // Also matches values from image_resizing.py
    var AVAILABLE_ASPECT_RATIOS = [
        [16, 9],
        [4, 3],
        [3, 2],
        [1, 1]
    ];

    // Appends a suffix to the filename part of a url path.
    var appendToUrlPath = function(path, suffix) {
        var pathParts = path.split("/");
        var file = pathParts.pop().split(".");
        var pathStart = pathParts.join("/");
        if (file.length <= 1) {
            return pathStart + "/" + file.join() + suffix;
        }
        var extension = file.pop();
        var withSuffix = file.join(".") + suffix + "." + extension;
        return pathStart + "/" + withSuffix;
    };

    // Get closest available target width for resizing (rounding up).
    var resizeWidth = function(targetWidth) {
        var closest = _.find(AVAILABLE_WIDTHS, function(width) {
            return width >= targetWidth;
        });
        return closest || _.last(AVAILABLE_WIDTHS);
    };

    // Get closest available aspect ratio.
    var resizeAspect = function(targetAspectStr) {
        var parts = targetAspectStr.split("-");
        var width = parseFloat(parts[0]);
        var height = parseFloat(parts[1]);
        var targetAspect = width / height;
        var deltas = _.map(AVAILABLE_ASPECT_RATIOS, function(ratio) {
            // Get ratio as float
            ratio = ratio[0] / ratio[1];
            // Get delta with respect to target
            return Math.abs(ratio - targetAspect);
        });
        var closest = _.sortBy(deltas)[0];
        var closestIndex = _.indexOf(deltas, closest);
        return AVAILABLE_ASPECT_RATIOS[closestIndex];
    };

    // Get the url for an image resized to the given (or closest
    // available) target width and aspect ratio.
    var resize = function(data, photoKey, targetWidth, targetAspect) {
        // Default to original photo url if resize not ready
        var photo = data[photoKey];
        if (!data[photoKey + "_resize_ready"]) {
            return photo;
        }
        var width = targetWidth ? "-width-" + resizeWidth(targetWidth) : "";
        var aspect = "";
        if (targetAspect) {
            var parts = resizeAspect(targetAspect);
            aspect = "-aspect-" + parts[0] + "-" + parts[1];
        }
        var urlParts = utils.parseUrl(photo);
        var suffix = width + aspect;
        urlParts.pathname = appendToUrlPath(urlParts.pathname, suffix);
        return urlParts.getUrl();
    };

    var exports = {};
    exports.resize = resize;

    return exports;
});
