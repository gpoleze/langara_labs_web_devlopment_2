(function (parameter) {
    'use strict';

    function ValidateForm(f) {
        /* 
           The variable f contains the whole form.  You can access each element within the form
           using property notation or associative array notation.  The example below will obtain 
           the value of the element named xval.  (Remember: we are working with names not ids!)
           
           Property notation:  f.xval.value 
           Associative array notation:  f['xval'].value 
           
           Property notation looks cleaner for most things and should be used most of the time. 
           Associative array notation can be used any time and *must* be used when the name of 
           the element contains square brackets [].
        */
        if (f.xval.value == "") {
            alert("You must enter an X offset value");
            return false;
        }

        if (f.yval.value == "") {
            f.yval.style.border = "2px solid red";
            //Action 4
            alert("You must enter an Y offset value");
            return false;
        }

        //        var PhoneRE = /^[0-9]{10}$/;
        //Action 6
        var PhoneRE = /\b(778|604)[-.]?\d{3}[-.]?\d{4}\b/;
        if (!PhoneRE.test(f.phone.value)) {
            //            alert("Phone number must be 10 decimal digits");
            alert("Phone number must be 10 decimal digits and must be like 778-xxx-xxxx or  604-xxx-xxxx");
            return false;
        }

        //Action 5
        //        var postalRE = /^([A-Z][0-9]){3}$/;
        var postalRE = /^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
        if (!postalRE.test(f.postalCode.value)) {
            alert("Postal code must be LNL NLN");
            return false;
        }

        //Action 7
        //        if (!f['winter[]'][1].checked) {
        if (checkedCounter('winter[]') < 2) {
            //            alert("You must choose the 2nd winter activity (" + f['winter[]'][1].value + ").");
            alert("You must choose at least 2 winter activities.");
            return false;
        }

        return true;
    }

    var validate = function (event) {
        if (!ValidateForm(langara.get(parameter.submitID, true))) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    //Action 7
    function checkedCounter(elementName) {
        var winterChoice = document.getElementsByName(elementName);
        var index = 0;
        for (var i = 0; i < winterChoice.length; i++) {
            if (winterChoice[i].checked)
                index++;
        }
        return index;
    }

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.submitID, 'submit', validate);
    };

    registerHandlers();

})({
    submitID: "submitAction"
});