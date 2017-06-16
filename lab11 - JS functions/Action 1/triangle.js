(function (parameters) {
    "use strict";

    function draw() {
        try {
            //            Get Size Input from HTML

            var size = langara.get(parameters.sizeID);
            //            Test Input Size Error
            if (isError(size))
                throw isError(size);

            //            Get other Inputs from HTML
            var symbolOdd = langara.get(parameters.firstSymbolID);
            var symbolEven = langara.get(parameters.secondSymbolID);

            var upsideDown = langara.get(parameters.drawOrderID);


            //            Populate the strings
            var triangleSlashN = makeTriangle(size, upsideDown, symbolOdd, symbolEven, "", "\n");
            var triangleBrTag = makeTriangle(size, upsideDown, symbolOdd, symbolEven, "", "<br>");
            var triangleLiTag = makeTriangle(size, upsideDown, symbolOdd, symbolEven, "<li>", "</li>");

            //            Set outputs
            setOutput(parameters.outputID   , triangleSlashN);
            setOutput(parameters.textAreaID , triangleSlashN);
            setOutput(parameters.divID      , triangleBrTag);
            setOutput(parameters.ulID       , triangleLiTag);



        } catch (err) {
            setOutput(parameters.textAreaID, "Input is " + err + ", try a integer number");
            setOutput(parameters.outputID, "Input is " + err + ", try a integer number");
            setOutput(parameters.divID, "Input is " + err + ", try a integer number");
            setOutput(parameters.ulID, "Input is " + err + ", try a integer number");
        }
    }

    var isError = function (input) {
        if (isNaN(input))
            return "not a number";
        if (input % 1 !== 0)
            return "a floating point number";
        return false;
    }

    var makeTriangle = function (size, upsideDown, symbolOdd, symbolEven, prefix, sufix) {

        if (upsideDown)
            return forDown(size, symbolOdd, symbolEven, prefix, sufix);

        return forUp(size, symbolOdd, symbolEven, prefix, sufix);

    }

    var forUp = function (size, symbolOdd, symbolEven, prefix, sufix) {
        var allLines = "";
        for (var i = 1; i <= size; i++)
            allLines += createLine(i, ((i % 2 === 1) ? symbolOdd : symbolEven), prefix, sufix);
        return allLines;
    }

    var forDown = function (size, symbolOdd, symbolEven, prefix, sufix) {
        var allLines = "";
        for (var i = size; i >= 1; i--)
            allLines += createLine(i, ((i % 2 === 1) ? symbolOdd : symbolEven), prefix, sufix);
        return allLines;
    }

    var createLine = function (length, symbol, prefix, sufix) {
        var line = prefix;
        for (var i = 1; i <= length; i++)
            line += symbol;

        return line + sufix;
    }

    var setOutput = function (ID, outputPlace) {
        langara.set(ID, outputPlace);
    }

    var registerHandler = function () {
        var button = langara.registerEventHandler(parameters.drawID, "click", draw);
    }

    registerHandler();

})({
    sizeID: "size",
    drawID: "draw",
    outputID: "output",
    textAreaID: "textAreaOutput",
    divID: "divOutput",
    ulID: "ulOutput",
    firstSymbolID: "firstSymbol",
    secondSymbolID: "secondSymbol",
    drawOrderID: "drawOrder"
});