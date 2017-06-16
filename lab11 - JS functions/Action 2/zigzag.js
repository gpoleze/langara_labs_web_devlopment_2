(function (parameters) {
    "use strict";

    function draw() {
        try {
            //            Get Size Input from HTML

            var height = langara.get(parameters.heightID);
            var width = langara.get(parameters.widthID);
            //            Test Input Size Error
            if (isError(height) || isError(width))
                throw isError("not valid ");

            //            Get other Inputs from HTML
            var symbol = langara.get(parameters.firstSymbolID);

            var zigFirst = langara.get(parameters.drawOrderID);


            //            Populate the strings
            var outputString = makeZigZag(width, height, symbol, zigFirst);

            //            Set outputs
            setOutput(parameters.outputID, outputString);

        } catch (err) {
            setOutput(parameters.outputID, "Input is " + err + ", try a integer number");
        }
    }

    var isError = function (input) {
        if (isNaN(input))
            return "not a number";
        if (input % 1 !== 0)
            return "a floating point number";
        return false;
    }

    var makeZigZag = function (width, height, symbol, zigFirst) {
        var output = "";
        var prefix = "";
        var sufix = '\n';
        for (var i = 0; i < height; i++) {
            if (zigFirst) {
                output += forDown(width, symbol, symbol, prefix, sufix);
                output += forUp(width - 1, symbol, symbol, prefix, sufix);
            } else {
                output += forUp(width, symbol, symbol, prefix, sufix);
                output += forDown(width - 1, symbol, symbol, prefix, sufix);
            }
        }
        return output;
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
    heightID: "height",
    widthID: "width",
    drawID: "draw",
    outputID: "output",
    firstSymbolID: "firstSymbol",
    drawOrderID: "drawOrder"
});