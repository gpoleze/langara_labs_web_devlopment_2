$(document).ready(function () {
    //SETUP
    $.ajaxSetup({
        cache: false
    });

        //EVENT LISTENERS
    $("#SomeID").change(functionPointer1);
    $("#AnotherID").click(functionPointer1);

    //AJAX CONNECTION
    function ajaxProcedure() {
        //AJAX FORMATTING SETUP
        var source = "http://api.b246b.ca/scripts/countrylookup.php";

        var option = $("#optionChosed").val();
        var selector = $("#countryOrContinet").val();

        var messageGET = "accesskey=CPSC2030&" + selector + "=" + option;

        if (option) {
            $("#result")
                .html("Looking for your answer...")
                .load(source, messageGET, outputData);


            // Here is the main AJAX call.  This jQuery function always uses GET method for passing data.
            //   The first argument is the script that will run.
            //   The second argument is the data being sent.
            //     (It is always a series of name1=value1&name2=value2&etc. pairs.)
            //   The third argument is what function to call when AJAX is complete.
            //     (That function should have one argument.  It will be for the data that was 
            //      returned from the server.)

            $.getJSON(source, messageGET, outputData);
        }
    };

    //AJAX RELATED FUNCTION
    function outputData(data) {
        if (typeof data !== "string") {
            console.log(typeof data);
            console.log(data[0]);

            $("#result")
                .html("")

            if (data.length === 1)
                countryOutput(data);
            else
                continentOutput(data);
        }
    }
}