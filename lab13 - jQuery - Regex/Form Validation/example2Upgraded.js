$(document).ready(function () {

    var winterRules = {

        rules: {
            "winter[]": {
                minlength: 2
            }
        },
        messages: {
            "winter[]": "You must choose at least 2 winter activities."
        },
        errorLabelContainer: "#winterErrorMessage"

    };



    var otherRules = {
        rules: {
            xval: "required",
            yval: "required",
            phone: {
                required: true,
                phoneNumberBC: true
            },
            postalCode: {
                required: true,
                postalCodeCA: true
            }

        },
        messages: {
            xval: "You must enter an X offset value",
            yval: "You must enter an Y offset value",
            phone: "Phone number must be 10 decimal digits and must be like 778-xxx-xxxx or  604-xxx-xxxx",
            postalCode: "Postal code must be LNL NLN"

        }

    };
    //    $("#submitAction").validate(otherRules);
    $("#submitAction").validate(otherRules, winterRules);

});

$.validator.addMethod("postalCodeCA", function (value, element) {
    return this.optional(element) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] *\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(value);
}, "Please specify a valid postal code");

$.validator.addMethod("phoneNumberBC", function (value, element) {
    return this.optional(element) || /\b(778|604)[-.]?\d{3}[-.]?\d{4}\b/i.test(value);
}, "Please specify a valid phone number");