$(document).ready(function () {
    "use strict";

    // -- CHANGING THE INPUT FORM STYLE WHEN FOCUSED -- //
    $("input:text").focusin(function () {
        $(this).closest(".form-group").addClass("has-warning");
    });

    $("input").focusout(function () {
        $(this)
            .closest(".form-group").removeClass("has-warning");
    });

    // -- EVENT LISTENERS -- //
    $("input:text").change(validate);
    

    function validate(e) {
        var idName = "#" + e.target.id;
        var pattern = getPattern(idName);

        var str = $(idName).val();

        console.log(str.match(pattern));

        var item = $(idName).closest(".form-group");

        if (str.match(pattern)) {
            if (item.hasClass("has-error"))
                item.removeClass("has-error");

            item.addClass("has-success");
            return true;
        } else {
            if (item.hasClass("has-success"))
                item.removeClass("has-success");

            item.addClass("has-error");
            return false;
        }
    }

    // --  VALIDATOR FUNCTIONS -- //

    function validate2(idName) {
        var pattern = getPattern(idName);
        var str = $(idName).val();
        console.log("pattern", pattern);
        console.log("str", str);



    }

    function getPattern(idName) {
        if (idName == "#filter")
            return /(\w*)/;

        if (idName == "#name")
            return /^([\w+\s?\(?\)?]+)$/;

        return /^(\d+)$/;
    }

});

