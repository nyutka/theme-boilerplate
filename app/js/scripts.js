"use strict";
require("./common/data-loader.js").init("optimal");
var $ = require("jquery");
var JSContext = require("./common/jscontext.js");
var navigation = require("../includes/navigation/navigation.js").load();
var profile = require("../includes/profile/profile.js").load();
var office = require("../includes/office/office.js").load();
var products = require("../includes/products/products.js").load();

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
    profile.init(window.JSContext);
    office.init(window.JSContext);
    products.init(window.JSContext);
};

$(document).ready(function () {
    initializeTemplates();
});