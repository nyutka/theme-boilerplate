"use strict";
var _ = require("underscore");
var $ = require("jquery");
var Module = function(args) {

    // Merge arguments object in the Module loader. Expected values:
    // this.name
    // this.htmlTemplate
    // this.callback

    if (args) {
        for (var attrname in args) {
            this[attrname] = args[attrname];
        }
    }

    this.render = function(template, data) {
        var template = _.template(template),
            renderedTemplate = template(data);
        return renderedTemplate;
    },

    this.inject = function(renderedTemplate) {
        var $container = $("#" + this.id);
        // Append rendered module in the container element in the DOM
        $container.append(renderedTemplate);
        console.log(this.id + " loaded.");
    }

    this.init = function(data, id) {

        if (id) {
            this.id = id;
        }

        this.templateData = $.extend({
            module: this
        }, data);

        // Render module
        var renderedTemplate = this.render(this.htmlTemplate, this.templateData);

        this.inject(renderedTemplate);

        // Execute any module specific javascript
        this.callback();
    }

};

module.exports = Module;