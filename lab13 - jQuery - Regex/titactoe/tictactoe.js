var cellValues = [["blank.png", "blank.png", "blank.png"], ["blank.png", "blank.png", "blank.png"], ["blank.png", "blank.png", "blank.png"]];

var image = ["blank.png", "oh.png", "ex.png"];


$(document).ready(function () {

    $("h1").click(function () {
        $(this).next().slideToggle();
    });

    $("td").mouseover(function () {
        $(this).addClass("cellHighlight");
    })

    $("td").mouseout(function () {
        $(this).removeClass("cellHighlight");
    })


    $("img").click(function () {
        $(this).hide();
        var attribute = $(this).attr("src");
        var index = image.indexOf(attribute);
        if (++index > 2)
            index = 0;

        $(this).attr("src", image[index]).fadeIn("slow");
        youWin();
    })

});

var youWin = function () {
    for (var i = 0; i < cellValues.length; i++) {
        //Horizontal Lines
        if (cellValues[i][1] !== "blank.png" && (cellValues[i][1] == cellValues[i][2] && cellValues[i][1] == cellValues[i][3])) {
            console.log(1);
            //            winnerMessage(cellValues[i][1]);
            return;
        }
        //Vertical lines
        if (cellValues[1][i] !== "blank.png" && cellValues[1][i] == cellValues[2][i] && cellValues[1][i] == cellValues[3][i]) {
            winnerMessage(cellValues[1][i]);
            return;
        }
    }
    //Diagonals
    if (cellValues[1][1] !== "blank.png" &&
        cellValues[1][1] == cellValues[2][2] && cellValues[1][1] == cellValues[3][3]) {
        winnerMessage(cellValues[1][1]);
        return;
    }
    if (cellValues[1][3] !== "blank.png" &&
        cellValues[1][3] == cellValues[2][2] && cellValues[1][3] == cellValues[3][1]) {
        winnerMessage(cellValues[1][3]);
        return;
    }
    console.log(4);
}

var winnerMessage = function (winner) {

    window.alert("Gongratulations" + winner + "won the match");
}