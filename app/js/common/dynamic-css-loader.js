"use strict";
require("./data-loader.js").init("optimal");
var css = require("../../includes/css-block/css-block.js").load();

var loadDynamicCss = function() {
    var cssStyles = css.render(css.htmlTemplate, window.JSContext),
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = cssStyles;
    } else {
        style.appendChild(document.createTextNode(cssStyles));
    }
    head.appendChild(style);
}

module.exports.loadDynamicCss = loadDynamicCss;