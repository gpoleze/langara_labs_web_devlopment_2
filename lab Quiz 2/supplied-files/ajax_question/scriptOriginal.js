$(document).ready(function () {
    //SETUP
    $.ajaxSetup({
        cache: false
    });

    var source;
    var option;
    var message;
    var output;
    var question;

    //EVENT LISTENERS
    newQuestion();
    $("#submit").click(answer);


    function newQuestion() {
        source = "http://bgreen.b246b.ca/getquestion.php";
        option = "";
        message = "";
        output = [".question"];

        ajaxProcedure(source, message, output)
    }

    function answer() {
        source = "http://bgreen.b246b.ca/checkquestion.php";
        option = $("input[name=choice]:checked").val();
        message = "q=" + question.num + "&a=" + option;

        output = [".answer"];

        if (!option) {
            alert("Must choose an option");
        } else {
            //            console.log("\nrequesting the answer to server");
            //            console.log("option", option);
            ajaxProcedure(source, message, output)
        }
    }

    //AJAX CONNECTION
    function ajaxProcedure(source, message, output) {
        //        console.log("source", source);
                console.log("message", message);
        //        console.log("output", output);


        if (output[0] == ".answer")
            $(output[0])
            .html("Looking for your answer...")
            .load(source, message, function (data) {
                console.log("\nshowing what I got from NOT JSON function: >", data, "<");
                output.push(data);
                outputData(output)
            });
        else
            $.getJSON(source, message, function (data) {
                console.log("\nshowing what I got from JSON: >", data, "<");
                output.push(data);
                outputData(output)
            });
    };

    //AJAX RELATED FUNCTION
    function outputData(output) {
        //        console.log("inside output data function");

        console.log("output type: ", typeof output);
        console.log("outputData function: >", output, "<");
        console.log(typeof output[1]);

        if (output[0] == ".question") {
            question = output[1];
            console.log("question:", question);
            $(output[0])
                .html(output[1].question);
        } else
            $(output[0])
            .html(output[1]);

    }
});
