var Module = require("theme_module_loader");
var JSContext = require("../../js/common/jscontext.js");
var htmlTemplate = require("./events.html");
var callback = function(moduleRef) {

    var $boxes = moduleRef.$container.find('.sf-events .boxes');
    var visible = 2;
    var $loadMore = moduleRef.$container.find('.load-more');

    $loadMore.on('click', function(event) {
        event.preventDefault();

        visible += 2;
        $boxes.each(function(index, el) {
            if (index < visible) {
                $(el).removeClass('hidden-xs hidden-sm');
            }
        });

        if (visible >= $boxes.length) {
            $loadMore.hide();
        }
    });
};
module.exports = {
    load: function() {
        var args = {
            id: "events",
            /* the div id to which the module will be appended */
            htmlTemplate: htmlTemplate,
            /* the Underscore template that will be used by the module */
            callback: callback /* a function to execute after the module has been rendered. Wrap there any javascript for the module */
        };

        return new Module(args);
    }
}
