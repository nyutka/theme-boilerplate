var buildDummyJSContext = function (profileType, page_id) {
    var profile = {};
    switch (profileType) {
    case ("optimal"):
        profile = require("../../fixtures/profile-optimal.json");
        break;
    case ("minimal"):
        profile = require("../../fixtures/profile-minimal.json");
        break;
    case ("edge"):
        profile = require("../../fixtures/profile-edge-cases.json");
        break;
    default:
        profile = require("../../fixtures/profile-optimal.json");
        break;
    }
    var JSContext = {
        page_id: page_id,
        base_link: "test",
        org_link: "test",
        posts: require("../../fixtures/posts.json"),
        events: require("../../fixtures/events.json"),
        theme_data: require("../../fixtures/theme-data-2.json"),
        profile: profile
    }
    return JSContext;
};

var initJSContext = function (profileType, page_id) {
    if (!window.JSContext) {
        var JSContext = require("./jscontext.js");
        JSContext.loadData(buildDummyJSContext(profileType, page_id));
    }
};

module.exports = {
    init: function (profileType, page_id) {
        initJSContext(profileType, page_id);
    }
};