$(document).ready(start);

function start() {
    "use strict";

    $("#calculate").click(function () { // capture the click
        if ($("#formToValidate").valid()) { // test for validity
            calculate();
        }
        //        else {
        //           so sttuff here
        //        }
    });

    $.validator.setDefaults({
        errorClass: 'error',
        validClass: 'success',
    });

    $("#formToValidate").validate({
        //      
        rules: {
            principal: {
                required: true,
                numberPattern: true
            },
            interest_rate: {
                required: true,
                numberPattern: true
            },
            years: {
                required: true,
                integerPattern: true
            }
        },
        messages: {
            //            principal: "You must enter an X offset value",
//            years: "You must enter an Y offset value",
            //            phone: "Phone number must be 10 decimal digits and must be like 778-xxx-xxxx or  604-xxx-xxxx",
            //            postalCode: "Postal code must be LNL NLN",
            //            "winter[]": "You must choose at least 2 winter activities."
        }
    });



    //-- Mathematical Calculations --//

    function calculate() {

        var principal = $("#principal").val();
        //        validateInputs(principal);

        var years = $("#years").val();

        var payments = $("#payments").val();
        var numberOfPayments = fnNumberOfPayments(payments, years);

        var interest_rate = $("#interest_rate").val();
        var rate = fnRate(interest_rate, payments);

        var selectShowOption = $("input[name=show]:checked").val();

        if (selectShowOption == "show_payment")
            $("#output").html(
                "The monthly payment is: " +
                paymentAmount(principal, rate, numberOfPayments).toFixed(2)
            );
        else
            $("#output")
            .html(
                totalPayment(principal, rate, numberOfPayments).toFixed(2) +
                " total interest paid"
            );
    }

    function fnNumberOfPayments(payments, years) {
        if (payments == "monthly")
            return 12 * years;
        if (payments == "bi_weekly")
            return 26 * years;
        if (payments == "weekly")
            return 52 * years;
        return years;
    }

    function fnRate(interest_rate, payments) {
        if (payments == "monthly")
            return interest_rate / 1200;
        if (payments == "bi_weekly")
            return interest_rate / 2600;
        if (payments == "weekly")
            return interest_rate / 5200;
        return interest_rate / 100;
    }

    function paymentAmount(principal, rate, numberOfPayments) {
        return (rate * principal) / (1 - Math.pow(1 + rate, -numberOfPayments));
    }

    function totalPayment(principal, rate, numberOfPayments) {
        return paymentAmount(principal, rate, numberOfPayments) * numberOfPayments - principal;
    }

    //-- Inputs Validation --//



    $.validator.addMethod("numberPattern", function (value, element) {
        return this.optional(element) || /^(\d+\.?\d*?)$/.test(value);
    }, "Please enter a number");

    $.validator.addMethod("integerPattern", function (value, element) {
        return this.optional(element) || /\d+/i.test(value);
    }, "Please an integer number");

    $("input").focusin(function () {
        if (this.id != "calculate")
            $(this).addClass("orange");
    });

    $("input").focusout(function () {
        $(this).removeClass("orange");
    });
    
    $("input[type=checkbox]").change(function(){
        $(this).removeClass();
    })
}





//
//    #principal
//    #interest_rate
//    #payments
//    #years
//    #show_payment
//    #show_interest
//    #calculate
//    #output
//
