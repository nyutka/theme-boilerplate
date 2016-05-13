/* globals JSON */

/************************/
/* Contact Form helpers */
/************************/

define([
    "jquery",
    "underscore"
], function(
    $,
    _
) {
    "use strict";

    var getValidatedPostData = function(options) {
        var defaults = {
            formElementSelector: ".contact-form",
            nameFieldSelector: "#contact-name",
            emailFieldSelector: "#contact-email",
            phoneFieldSelector: "#contact-phone",
            commentFieldSelector: "#contact-comments"
        };

        var options = _.extend(defaults, options);

        // Check for html5 form validation before processing anything
        var formElement = $(options.formElementSelector);
        if (formElement.length < 1 || !formElement[0].checkValidity()) {
            return false;
        }

        // Validation handled via html5 form validation. No need to validate in JS
        var fieldToValidatedEl = {
            name: formElement.find(options.nameFieldSelector),
            email: formElement.find(options.emailFieldSelector),
            phone: formElement.find(options.phoneFieldSelector),
            comments: formElement.find(options.commentFieldSelector)
        };

        var postParams = {};
        _.each(fieldToValidatedEl, function( value, key ) {
            postParams[key] = value && value.val();
        });

        // Collect custom data for use in new-lead e-mail
        var customData = [];
        var customGroups = formElement.find(".form-group-custom");
        $(customGroups).each(function(groupIndex, group) {

            var groupParams = {};
            var groupFields = [];

            // Iterate through input fields and associated labels. Each input field must have
            // a corresponding label to render in the new-lead e-mail.
            $(group).find("input, textarea, select").each(function(inputIndex, input) {
                if (input.className === "form-group-title") {
                    // Save group title and description from hidden input fields for formatting purposes
                    groupParams.title = input.value;
                    groupParams.title = groupParams.title.replace(/\*+$/, '');
                } else if (input.className === "form-group-description") {
                    groupParams.description = input.value;
                } else {
                    if (input.required && !input.value) {
                        customData = false;
                        return false;
                    }

                    // Don't include unchecked radio buttons
                    if (input.type === "radio" && !input.checked) {
                        return true;
                    }

                    // If a 'data-label' attribute is specified in the input use it's value as the label.
                    var field = {},
                        value = input.value;
                    if ($(input).attr("data-label")) {
                        field.label = $(input).attr("data-label");
                    } else {
                        // Handle radio buttons. Use selected radio button <label> as the field's value,
                        // and the 'parent' <label> associated with the radio button group via the 'for' attribute
                        // as the field's label.
                        var $label;
                        if (input.type === "radio") {
                            $label = $("label[for='" + input.name + "']");
                            var $buttonLabel = $("label[for='" + input.id + "']");
                            value = $buttonLabel.text();
                        } else {
                            $label = $("label[for='" + input.id + "']");
                        }
                        if ($label) {
                            // Allow label value to be overridden by data-label attribute
                            if ($label.attr("data-label")) {
                                field.label = $label.attr("data-label");
                            } else {
                                field.label = $label.text().replace(/\*+$/, '');
                            }
                        }
                    }
                    // Only include this input if there is a 'label' - the new-lead e-mail needs it.
                    if (field.label) {
                        field.id = input.id;
                        field.value = value;
                        groupFields.push(field);
                    }
                }
            });
            groupParams.fields = groupFields;
            customData.push(groupParams);
        });
        // add custom data as JSON so custom processor can process it
        if (customData && customData.length > 0) {
            postParams.custom_data = customData;
        }
        // call custom processor if available
        if (_.isFunction(options.customProcessor)) {
            postParams = options.customProcessor(postParams);
        }
        // stringify custom data
        if (postParams.custom_data) {
            postParams.custom_data = JSON.stringify(postParams.custom_data);
        }

        return postParams;
    };

    var postContact = function(apiLink, slug, postData, successCallback) {
        var postUrl = apiLink + "api/contact/" + slug + "/";

        $.ajax({
            url: postUrl,
            data: JSON.stringify(postData),
            cache: false,
            dataType: "json",
            traditional: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(){
                successCallback();
             }//,
            // error: function(a, b, c) {
            //     console.log(a, b, c);
            // }
        });
    };

    var renderSuccess = function(){
        $(".contact-form input, .contact-form textarea").val("");
        $("#contact-empty").hide();
        $("#contact-success").show();
        $("html, body").animate({
            scrollTop: $("#contact-container").offset().top
        }, 1000);
        // remove html5 validation errors, if any
        $(".contact-form").removeClass("validated");
    };

    var activate = function(apiLink, slug, options) {
        var defaults = {
            formElementSelector: ".contact-form"
        };
        options = _.extend(defaults, options);

        $(options.formElementSelector + " button[type='submit']").on("click", function(e) {
            var $target = $(e.currentTarget);
            e.preventDefault();

            // add html5 validation errors, if any
            $target.closest("form").addClass("validated");

            var postParams = getValidatedPostData(options);

            if (postParams && !(_.contains(postParams, false))) {
                var cb = options.onSuccess || renderSuccess;
                postContact(apiLink, slug, postParams, cb);
            }
            return false;
        });
    };

    var exports = {};
    exports.activate = activate;

    return exports;
});
