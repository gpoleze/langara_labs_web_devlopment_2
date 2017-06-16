(function () {
        "use strict";
        $(document).ready(function () {

                $.ajaxSetup({
                    type: "GET",
                    cache: false
                });

                var url = "http://api.b246b.ca/scripts/dictlookup.php";

                $("#lookUpButton").click(
                    function () {
                        var word = $("#myWord").val();
                        var message = "accesskey=CPSC2030&word=" + word;
                        console.log(message);

                        $("#result")
                            .html("Searching your word")
                            .load(url, message, function (data) {
                                console.log("data received back:>", typeof data, "<");

                                if (data == "true")
                                    $("#result").html("There is the word <strong><em>" + word + "</em></strong> on the dictionary");
                                else
                                    $("#result").html("There is NO such the word <strong>" + word + "</strong> on the dictionary");

                            })
                    }
                );

                $("#findWords").click(
                    function () {
                        var letter = $("#letter").val();
                        var message = "accesskey=CPSC2030&startswith=" + letter;

                        $("#table").html("Searching for the words")
                        $.getJSON(url, message, output)
                    }
                );

                function output(data) {
                    console.log(data[0], ": ", data.length);
                    var size = data.length / 5;
                    var table = $("#table");
                    for (var i = 0; i < size; i++) {
                        table.append("<tr></tr>")
                            .append("<td>" + data[i + size * 0] + "</td>")
                            .append("<td>" + data[i + size * 1] + "</td>")
                            .append("<td>" + data[i + size * 2] + "</td>")
                            .append("<td>" + data[i + size * 3] + "</td>")
                        // if (i + size * 4 <= data.length))
                    .append("<td>" + data[i + size * 4] + "</td>");

                }

            }

        });

})();