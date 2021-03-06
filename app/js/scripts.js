"use strict";
require("./common/data-loader.js").init("optimal");
var $ = require("jquery");
var JSContext = require("./common/jscontext.js");
var navigation = require("../includes/navigation/navigation.js").load();
var sf_profile = require("../includes/sf_profile/sf_profile.js").load();
var sf_office = require("../includes/sf_office/sf_office.js").load();
var sf_products = require("../includes/sf_products/sf_products.js").load();
var sf_events = require("../includes/sf_events/sf_events.js").load();
var sf_news = require("../includes/sf_news/sf_news.js").load();
var sf_contact = require("../includes/sf_contact/sf_contact.js").load();
var footer = require("../includes/footer/footer.js").load();

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
    sf_profile.init(window.JSContext);
    sf_office.init(window.JSContext);
    sf_products.init(window.JSContext);
    sf_events.init(window.JSContext);
    sf_news.init(window.JSContext);
    sf_contact.init(window.JSContext);
    footer.init(window.JSContext);
};

$(document).ready(function () {
    initializeTemplates();
});