/**************************/
/* JSContext data getters */
/**************************/


var _ = require("underscore");
var utils = require("./utils");

// Used to load alternative data into JSContext (i.e. sample data)
var loadData = function(data) {
    window.JSContext = data;
};

var _get = function(key) {
    return window.JSContext && window.JSContext[key];
};

var _formatPosts = function(posts, dateFormat) {
    return _.map(posts, function(post) {
        post.link = utils.makeAbsolute(post.link);
        if (post.publish_date) {
            post.formattedPublishDate = utils.formatDate(post.publish_date, dateFormat);
        }
        return post;
    });
};

var _formatEvents = function(events, dateFormat, dateEndFormat) {
    dateEndFormat = dateEndFormat || "h:mm a";
    return _.map(events, function(event) {
        event.formattedDate = utils.formatDate(event.event_date, dateFormat);
        if (event.event_date_end) {
            event.formattedDateEnd = utils.formatDate(event.event_date_end, dateEndFormat);
        }
        switch (event.rsvp_type) {
            case ("email"):
                event.rsvp_link = "mailto:" + event.rsvp_info;
                break;
            case ("link"):
                event.rsvp_link = utils.makeAbsolute(event.rsvp_info);
                break;
            case ("phone"):
                event.rsvp_link = "tel:" + utils.stripNonDigits(event.rsvp_info);
                break;
            default:
                break;
        }
        return event;
    });
};

var getProfile = function() {
    return _get("profile");
};

var getThemeData = function() {
    return _get("theme_data");
};

var getLocatorLink = function() {
    return _get("locator_link");
};

var getOrgLink = function() {
    return _get("org_link");
};

var getBaseLink = function() {
    return _get("base_link");
};

var getSlug = function() {
    return _get("slug");
};

var getRequestId = function() {
    return _get("request_id");
};

var getPosts = function(maxPosts) {
    var posts = _get("posts").slice(0, maxPosts);
    posts = _formatPosts(posts);
    return posts;
};

var getEvents = function(maxEvents) {
    var events = _get("events").slice(0, maxEvents);
    events = _formatEvents(events);
    return events;
};

var getCategories = function() {
    return _get("categories");
};

var getCategoryMap = function() {
    return _get("category_map");
};

var getStatusCode = function() {
    return _get("status_code");
};

var getStatusMessage = function() {
    return _get("status_message");
};

module.exports = {
    loadData: loadData,
    getProfile: getProfile,
    getThemeData: getThemeData,
    getLocatorLinkL: getLocatorLink,
    getOrgLink: getOrgLink,
    getSlug: getSlug,
    getRequestId: getRequestId,
    getPosts: getPosts,
    getEvents: getEvents,
    getCategories: getCategories,
    getCategoryMap: getCategoryMap,
    getStatusCode: getStatusCode,
    getStatusMessage: getStatusMessage,
    getBaseLink: getBaseLink
}