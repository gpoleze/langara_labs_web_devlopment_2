(function (parameter) {
    'use strict';

    var calculateGrades = function () {

        var name = langara.get(parameter.nameID);
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);

        var avarageGrade = 0;
        var size = parameter.gradesID.length;

        for (var i = 0; i < size; i++)
            avarageGrade += +langara.get(parameter.gradesID[i]);

        avarageGrade /= size;

        var outputMessage = name + " avarage was grade <strong>" + avarageGrade + "</strong>.";

        langara.set(parameter.outputID, outputMessage);
    };

    var registerHandlers = function () {

        langara.registerEventHandler(parameter.calculateID, 'click', calculateGrades);
    };

    registerHandlers();

})({
    nameID: "name",
    gradesID: [
        "grade1",
        "grade2",
        "grade3",
        "grade4",
        "grade5"],
    outputID: "answer",
    calculateID: "Calculate"
});