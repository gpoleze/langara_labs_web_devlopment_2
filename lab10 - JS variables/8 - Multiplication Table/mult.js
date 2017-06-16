(function (parameter) {
    "use strict";

    var mountTable = function () {

        var width = langara.get(parameter.widthID);
        var height = langara.get(parameter.heightID);
        var output = langara.get(parameter.outputID, true);

        //Clear the table
        output.innerHTML = "";

        //it will only start showing the table if width and height are different from zero
        if (width != 0 && height != 0)
            createContent(width, height, output);

    };

    var createContent = function (width, height, output) {
        for (var i = 0; i <= height; i++) {

            //create table row element <tr> and add into the table
            var tableRow = document.createElement("tr");
            output.appendChild(tableRow);

            for (var j = 0; j <= width; j++) {
                //create the content of the cell
                var content = document.createTextNode(cellContent(i, j));

                //create table descriptio element <td> and add into the table
                var tableDescription = document.createElement("td");
                tableRow.appendChild(tableDescription);

                //add the cell content into  the table content <td>
                tableDescription.appendChild(content);


                //decide wich name will be added into the class attribute
                if (i === 0 && j === 0)
                // only to the first position
                    langara.addClass(tableDescription, classTag(i, j));
                else if (i !== 0 && j !== 0 && i !== j)
                // all other cell except with the values
                    langara.addClass(tableDescription, classTag(i, j));

            }
        }
    }

    var cellContent = function (i, j) {
        if (i == 0 && j == 0)
            return "*";
        if (i == 0)
            return j;
        if (j == 0)
            return i;
        return i * j;
    };

    var classTag = function (i, j) {
        if (i > j)
            return "lower";
        if (j > i)
            return "upper";
        return "star";
    }

    var registerEventHandlers = function () {
        langara.registerEventHandler(parameter.widthID, 'keyup', mountTable);
        langara.registerEventHandler(parameter.heightID, 'keyup', mountTable);
    }

    registerEventHandlers();

})({
    widthID: "width",
    heightID: "height",
    outputID: "output"
});