var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var htmlTemplate = require("./navigation.html");
var callback = function(){

    $(window).scroll(function(){
        var sticky = $('.navigation'),
            scroll = $(window).scrollTop();

        if (scroll >= 22) sticky.addClass('navbar-fixed-top');
        else sticky.removeClass('navbar-fixed-top');
    });
};
module.exports = {
    load: function() {
        var args = {
            id: "navigation",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}