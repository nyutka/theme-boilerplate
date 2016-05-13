define([
    "jquery",
    "underscore",
    "moment"
], function(
    $,
    _,
    moment
) {

    var stripNonDigits = function(phone) {
        if (phone) {
            phone = phone.replace(/[^\d]/g, "");
        }
        return phone;
    };

    /* Ensure link is absolute. */
    var absoluteUrlRegex = /(?:^[a-z][a-z0-9+.-]*:|\/\/)/i;
    var makeAbsolute = function(link) {
        if (link && link.length > 0 && !absoluteUrlRegex.test(link)) {
            return "//" + link;
        }
        return link;
    };

    // Sets elements corresponding to a given css selector to a uniform
    // height, determined by the maximum height from the selected set.
    var setUniformHeight = function(selector) {
        var maxHeight = 0;
        $(selector).each(function() {
            maxHeight = Math.max(maxHeight, $(this).height());
        }).height(maxHeight);
    };

    // Replace overflowing text with ellipses in selection set.
    var ellipsify = function(selector) {
        $(selector).each(function() {
            var $ellipsisText = $(this);
            var textContainerHeight = $ellipsisText.parent().height();
            while ($ellipsisText.outerHeight() > textContainerHeight) {
                var text = $ellipsisText.text();
                if(text.match(/\W*\s(\S)*$/)) {
                    $ellipsisText.text(text.replace(/\W*\s(\S)*$/, "..."));
                } else {
                    break;
                }
            }
        });
    };

    // Parse a url into its components
    var parseUrl = function(url) {
        // Anchor tag parser can sometimes mess with the protocol/port. Keep
        // track of original properties so we can correct if necessary.
        var absoluteUrlRegex = /(?:^[a-z][a-z0-9+.-]*:|\/\/)/i;
        var isAbsolute = absoluteUrlRegex.test(url);
        var hasPort = /:\d+/.test(url);

        // Anchor elements implicity parse a url/href when set.
        // https://gist.github.com/jlong/2428561
        var a = document.createElement("a");
        // Don't want url to be treated as relative (path)
        a.href = makeAbsolute(url);

        var parts = ["protocol", "hostname", "port", "pathname", "search", "hash"];
        var parsed = _.pick(a, parts);

        // Make sure the pathname always beings with a /
        if (parsed.pathname &&
            parsed.pathname.length > 0 &&
            parsed.pathname[0] !== "/") {
           parsed.pathname = "/" + parsed.pathname;
        }

        parsed.getUrl = function() {
            var protocol = isAbsolute ? this.protocol + "//" : "";
            var port = hasPort ? ":" + this.port : "";
            return protocol + this.hostname + port + this.pathname + this.search + this.hash;
        };
        parsed.toString = parsed.getUrl;

        return parsed;
    };

    var addFormattedPhone = function(object, property) {
        if (object[property]) {
            object[property + "_link_formatted"] = stripNonDigits(object[property]);
        }
    };

    var breakParagraphs = function(object, property) {
        if(object[property]) {
            object[property + "_paragraphs"] = object[property].split(/\n/gm);
        }
    };

    var formatDate = function(dateString, dateFormat) {
        dateFormat = dateFormat || "MMMM DD YYYY, h:mm a";
        return moment.utc(new Date(dateString)).local().format(dateFormat);
    };

    var exports = {};
    exports.stripNonDigits = stripNonDigits;
    exports.makeAbsolute = makeAbsolute;
    exports.setUniformHeight = setUniformHeight;
    exports.ellipsify = ellipsify;
    exports.parseUrl = parseUrl;
    exports.addFormattedPhone = addFormattedPhone;
    exports.formatDate = formatDate;
    exports.breakParagraphs = breakParagraphs;

    return exports;
});
