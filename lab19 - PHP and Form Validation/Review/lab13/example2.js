(function () {
    "use strict";
    $(document).ready(function () {




        //Validacao


        $.validator.setDefaults({
            errorClass: 'error',
            validClass: 'success',
        });

        $("#formID").validate({
            rules: {
                xval: {
                    required: true,
                    maxlength: 2,
                    numberPattern: true
                },
                yval: {
                    required: true,
                    maxlength: 2,
                    numberPattern: true
                },
                postalCode: {
                    required: true,
                    postalPattern: true
                },
                phone: {
                    required: true,
                    phonePattern: true
                },
                "winter[]": {
                    minlength: 2
                }
            },
            messages: {
                xval: {
                    required: "You must enter an X offset value",
                    maxlength: "The maximum alowed characters is 2"
                },
                //                yval: "You must enter an Y offset value"
                //            phone: "Phone number must be 10 decimal digits and must be like 778-xxx-xxxx or  604-xxx-xxxx",
                //            postalCode: "Postal code must be LNL NLN",
                //            "winter[]": "You must choose at least 2 winter activities."

            }
        });


        //Pattern entries for specific validations
        $.validator.addMethod("numberPattern", function (value, element) {
            return this.optional(element) || /^(\d){1,2}$/.test(value);
        }, "Please enter a number");

        $.validator.addMethod("postalPattern", function (value, element) {
            return this.optional(element) || /^([a-zA-Z][\d][a-zA-Z] ?[\d][a-zA-Z][\d])$/.test(value);
        }, "Please enter a like A0A 0A0 OR A0A0A0");

        $.validator.addMethod("phonePattern", function (value, element) {
            return this.optional(element) || /^(\b(604|778)[-\.]?\d{3}[-.]?\d{4})$/.test(value);
        }, "Please enter a like start with 778 or 604, and must have 10 digits");



        //when instead a submit button, you have a button thet submits after validation

        $("#submit").click(function () {
            $("#formID").submit();
        });


        //Highlight Colouring

        $("input:text").focusin(addFocusColour);
        $("input:text").focusout(removeFocusColour);

        function addFocusColour(obj) {
            $(obj.target).css({
                background: "lightblue"
            })
        }

        function removeFocusColour(obj) {
            $(obj.target).css({
                background: "none"
            })
        }



    });

})();



/**
        
        Forma mais fácil de mudar cor quando em foco 
        
        $("input:text").focusin(function () {
            $(this).css({
                background: "lightblue"
            })
        });
                
        $("input:text").focusout(function () {
            $(this).css({
                background: "none"
            })
        });
        
        
        */
