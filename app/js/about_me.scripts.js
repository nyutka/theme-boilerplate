"use strict";
require("./common/data-loader.js").init("optimal", "about_me");
var $ = require("jquery");
var JSContext = require("./common/jscontext.js");
var navigation = require("../includes/navigation/navigation.js").load();
var header = require("../includes/header/header.js").load();
var footer = require("../includes/footer/footer.js").load();
var about_me = require("../includes/about_me/about_me.js").load();

var getPostsData = function (n) {
    return {
        posts: JSContext.getPosts(n),
        baseLink: JSContext.getBaseLink(),
        truncated: false
    };
};

var getEventsData = function (n) {
    var events = JSContext.getEvents(n);
    return {
        events: events,
        baseLink: JSContext.getBaseLink(),
        truncated: false
    };
};

var getHeaderData = function () {
    var themeData = JSContext.getThemeData();
    return {
        baseLink: JSContext.getBaseLink(),
        logo: themeData.logo_header,
        links: {
            corporateLink: themeData.corp_header_link_1,
            careersLink: themeData.corp_header_link_2,
            customerLoginLink: themeData.customer_login_link
        }
    };
};



var initializeTemplates = function () {
    navigation.init(window.JSContext);
    header.init(window.JSContext);
    footer.init(window.JSContext);
    about_me.init(window.JSContext);
};

$(document).ready(function () {
    initializeTemplates();
});