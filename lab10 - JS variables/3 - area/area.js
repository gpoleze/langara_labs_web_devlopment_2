(function (parameter) {
    'use strict';

    var calculateArea = function () {

        var width = langara.get(parameter.widthID);
        var lenght = langara.get(parameter.lenghtID);

        var area = width * lenght;
        var outputMessage = " The area of the rectangle " + width + " by " + lenght + " is <strong> " + area + " </strong>.";


        langara.set(parameter.outputID, outputMessage);
    };

    var registerHandlers = function () {

        langara.registerEventHandler(parameter.calculateID, 'click', calculateArea);
    };

    registerHandlers();

})({
    lenghtID: "Lenght",
    widthID: "Width",
    outputID: "answer",
    calculateID: "Calculate"
});