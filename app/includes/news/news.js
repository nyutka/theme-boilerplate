var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var htmlTemplate = require("./news.html");
var callback = function(moduleRef) {

    var $box = moduleRef.$container.find('.same-height .box');
    var visible = 2;
    var $loadMore = moduleRef.$container.find('.load-more');

    $loadMore.on('click', function(event) {
        event.preventDefault();

        visible += 2;
        $box.each(function(index, el) {
            if (index < visible) {
                $(el).removeClass('hidden-xs hidden-sm');
            }
        });

        if (visible >= $box.length) {
            $loadMore.hide();
        }
    });
};
module.exports = {
    load: function() {
        var args = {
            id: "news",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}