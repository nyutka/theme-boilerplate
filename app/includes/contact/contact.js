var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var ContactForm = require("../../js/common/contact-form.js");
var htmlTemplate = require("./contact.html");
var callback = function() {
    var Profile = JSContext.getProfile();
    ContactForm.activate('http://test.api.com/', Profile.slug);
};
module.exports = {
    load: function() {
        var args = {
            id: "contact",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}