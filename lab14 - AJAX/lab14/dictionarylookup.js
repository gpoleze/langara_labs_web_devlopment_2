// JavaScript Document
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    //Event Handlers
    $("#lookUpButton").click(ajaxProcedureWord);
    $("#findWords").click(ajaxProcedureArray);

    // Takes the data as retrieved from the server
    // and formats it nicely (at least it should)
    function outputData(data) {

        //        console.log(typeof data + ":" + data);
        //        $("aside p").html(typeof data + ":" + data);

        var theWord = $("#myWord").val();

        returnDealing(theWord, data)


    };

    function sentValue(word) {
        return "accesskey=CPSC2030&word=" + word;
    }

    function returnDealing(dataSent, data) {
        //        console.log(typeof data);//        console.log(Array.isArray(data));

        if (typeof data === "boolean") {
            outputMessageBoolean(dataSent, data);
            return;
        }
        if (Array.isArray(data)) {
            outputMessageArray(data);
        }

    }

    function outputMessageBoolean(dataSent, data) {
        var outputMessage = "";
        if (data) {
            outputMessage = "Yes, <strong>" + dataSent + "</strong> found.";
        } else {
            outputMessage = "<strong>" + dataSent + "</strong> not found";
        }
        $("#result").html(outputMessage);
    }

    function outputMessageArray(data) {
        console.log(data.length);

        var numberOfRows = 1000;


        var table = $("#table");

        table.html("");

        for (var i = 1; i < 1000; i++)
            table // or           $("#table")
            .append($("<tr></tr>")
                .append($("<td>" + data[i] + "</td>"))
            );

        var row = $("#table tr");


        var counter = 1000;
        var i = 0;


        do {
            row.eq(i).append($("<td>" + data[counter] + "</td>"));
            if (i++ >= 1000)
                i = 0;

        } while (++counter < data.length);



        console.log(table);
    }

    function isLetter(l) {
        l = l.toLowerCase();
        var code = l.charCodeAt(0);
        var min = ("a").charCodeAt(0);
        var max = ("z").charCodeAt(0);

        return (min <= code && code <= max);
    }

    function ajaxProcedureWord() {
        var theWord = $("#myWord").val();
        if (theWord) {
            $("#wordConnectionMessage")
                .html("A short message to indicate that it's working...")
                .load("http://api.b246b.ca/scripts/dictlookup.php", sentValue(theWord), outputData);

            // Here is the main AJAX call.  This jQuery function always uses GET method for passing data.
            //   The first argument is the script that will run.
            //   The second argument is the data being sent.
            //     (It is always a series of name1=value1&name2=value2&etc. pairs.)
            //   The third argument is what function to call when AJAX is complete.
            //     (That function should have one argument.  It will be for the data that was 
            //      returned from the server.)
            $.getJSON("http://api.b246b.ca/scripts/dictlookup.php", "accesskey=CPSC2030&word=" + theWord, outputData);
        }
    };

    function ajaxProcedureArray() {
        var letter = $("#letter").val();
        letter.toLocaleLowerCase();


        if (letter && isLetter(letter)) {
            $("#letterConnectionMessage")
                .html("<tr><td>A short message to indicate that it's working...</td></tr>")
                .load("http://api.b246b.ca/scripts/dictlookup.php", sentValue(letter), outputData);

            // Here is the main AJAX call.  This jQuery function always uses GET method for passing data.
            //   The first argument is the script that will run.
            //   The second argument is the data being sent.
            //     (It is always a series of name1=value1&name2=value2&etc. pairs.)
            //   The third argument is what function to call when AJAX is complete.
            //     (That function should have one argument.  It will be for the data that was 
            //      returned from the server.)
            $.getJSON("http://api.b246b.ca/scripts/dictlookup.php", "accesskey=CPSC2030&startswith=" + letter, outputData);
        }
    };


});