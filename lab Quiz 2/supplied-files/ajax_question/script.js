$(document).ready(function () {
    //SETUP
    $.ajaxSetup({
        cache: false
    });

    var source;
    var message;
    var question;

    //EVENT LISTENERS
    newQuestion();
    $("#submit").click(answer);


    //Get Question
    function newQuestion() {
        source = "http://bgreen.b246b.ca/getquestion.php";

        $(".question").load(source, "", function (data) {
            question = JSON.parse(data);
            this.html(question.question);
        });
    }

    //Evaluate Answer 
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
            evaluateAnswer(source, message, output)
        }
    }

    //AJAX CONNECTION
    function evaluateAnswer(source, message, output) {
        console.log("source", source);
        console.log("message", message);

        $(".answer")
            .html("Connecting the server")
            .load(source, message);
    };

});