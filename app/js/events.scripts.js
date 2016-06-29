"use strict";
require("./common/data-loader.js").init("optimal");
var $ = require("jquery");
var JSContext = require("./common/jscontext.js");
var navigation = require("../includes/navigation/navigation.js").load();
var header = require("../includes/header/header.js").load();
var footer = require("../includes/footer/footer.js").load();
var events = require("../includes/events/events.js").load();

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
    var themeData = JSContext.getThemeData();
    navigation.init(window.JSContext);
    header.init($.extend(window.JSContext, {page: {title: "Upcoming Events"}}));
    footer.init(window.JSContext);
    events.init(window.JSContext);
};

$(document).ready(function () {
    initializeTemplates();
});