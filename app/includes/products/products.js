var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var htmlTemplate = require("./products.html");
var callback = function() {
    $('.product-slider').slick({
        infinite: true,
        slidesToShow: 4,
        autoplay: true,
        speed: 200,
        arrows: true
    });
};
module.exports = {
    load: function() {
        var args = {
            id: "products",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}
