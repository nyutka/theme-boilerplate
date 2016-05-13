/****************************/
/* Profile helper functions */
/****************************/

define([
    "jquery",
    "underscore",
    "./jscontext",
    "./image-resizing",
    "./utils"
], function(
    $,
    _,
    JSContext,
    resizing,
    utils
) {

    // Adds .naturalSize() methods to jQuery for retrieving natural width and height
    // of an image.  Falls back to creating an Image object for older browers.
    (function($) {
        $.fn['naturalSize'] = ('naturalWidth' in new Image()) ?
            // Modern browsers have the property, just return it
            function() {
                return {
                    'width': this[0].naturalWidth,
                    'height': this[0].naturalHeight
                };
            } :
            // Older versions of IE don't have it, so get it by using an
            // Image with no styling or layout applied
            function() {
                var node = this[0],
                    value = {'width': 0, 'height': 0};

                if (node.tagName.toLowerCase() === 'img') {
                    var tempImage = new Image();
                    tempImage.src = node.src;
                    value.width = tempImage.width;
                    value.height = tempImage.height;
                }
                return value;
            };
    }($));

    /* Filter phone number to just the digits, and format nicely if asked. */
    var phoneFormat = function(phone, pretty) {
        var digits = utils.stripNonDigits(phone);
        if (!pretty) {
            return digits;
        } else {
            if (digits.length === 11) {
                return digits[0] + " (" + digits.slice(1, 4) + ") " +
                       digits.slice(4, 7) + "-" + digits.slice(7);
            } else if (digits.length === 10) {
                return "(" + digits.slice(0, 3) + ") " +
                       digits.slice(3, 6) + "-" + digits.slice(6);
            } else {
                return digits;
            }
        }
    };

    /* Join a tag/list selection with commas (and "and" when appropriate) */
    var tagJoin = function(list) {
        var last = list.length - 1;
        if (list.length < 2) {
            return list[0] || "";
        } else if (list.length === 2) {
            // No need for comma when only two items in list.
            return list[0] + " and " + list[1];
        } else {
            return list.slice(0, last).join(", ") + ", and " + list[last];
        }
    };

    /* Combine address elements into single string. */
    var printAddress = function(address) {
        address.city = address.city && address.city + ",";
        var fields = ["street", "suite", "city", "state", "country", "zip_code"];
        var fullAddress = _.chain(fields)
            .map(_.propertyOf(address))
            .compact()
            .value()
            .join(" ");
        // Remove comma from profile address data for future use.
        address.city = address.city && _.initial(address.city).join("");
        return fullAddress;
    };

    /* Generate map from profile address object. */
    var googleMapsLink = function(address) {
        return "http://maps.google.com/?q=" +
                encodeURIComponent(printAddress(address));
    };

    /* Generate directions from profile address object. */
    var googleMapsDirections = function(address) {
        return "http://maps.google.com/?daddr=" +
                encodeURIComponent(printAddress(address));
    };

    var getTagDisplayValue = function(tagName, tagValue) {
        // Use source if available, otherwise fall back to tag canonical name.
        var source = JSContext.getCategoryMap()[tagName] || tagName;
        var categories = JSContext.getCategories();
        if (source && categories[source]) {
            return categories[source][tagValue];
        }
        return tagValue; // Default to tagValue
    };

    var getURLForSlug = function(slug) {
        return JSContext.getOrgLink() + slug;
    };

    var exports = {};
    exports.makeAbsolute = utils.makeAbsolute;
    exports.phoneFormat = phoneFormat;
    exports.tagJoin = tagJoin;
    exports.printAddress = printAddress;
    exports.googleMapsLink = googleMapsLink;
    exports.googleMapsDirections = googleMapsDirections;
    exports.getTagDisplayValue = getTagDisplayValue;
    exports.getURLForSlug = getURLForSlug;
    exports.resize = resizing.resize;

    return exports;
});
