(function () {
    $(document).ready(function () {
        $("#formSearch").validate({
            rules: {
                filter: {
                    namePattern: true
                }
            }
        });
        $("#formAdd").validate({
            rules: {
                name: {
                    required: true,
                    namePattern: true
                },
                duration: {
                    required: true,
                    maxlenght: 3,
                    numberPattern: true
                },

            }
        });


        //Pattern entries for specific validations
        $.validator.addMethod("namePattern", function (value, element) {
            return this.optional(element) || /^([a-zA-Z]*)$/.test(value);
        }, "Only letters are allowed");
        $.validator.addMethod("numberPattern", function (value, element) {
            return this.optional(element) || /^([\d]+)$/.test(value);
        }, "Only numbers are allowed");




        //Colouring when focus
        $("input:text")
            .focusin(function () {
                $(this).css({
                    background: "lightblue"
                })
            })
            .focusout(function () {
                $(this).css({
                    background: "none"
                })
            });



    }); //end of document ready function
})();
