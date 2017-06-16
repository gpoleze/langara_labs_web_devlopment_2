(function (parameter) {
    'use strict';

    var calculateGrades = function () {

        var name = langara.get(parameter.nameID);
        var quantity = langara.get(parameter.quantytyID);
        var price = langara.get(parameter.priceID);
        var tax = langara.get(parameter.taxID) / 100;

        var totalTax = 0,
            totalOrder = 0;

        totalTax = quantity * price * tax;
        totalOrder = quantity * price + totalTax;

        var outputMessage = "You have ordered " + quantity + " " + name + ". The sales tax is <strong>CAD$" + totalTax.toFixed(2) + "</strong> and the total amount due is <strong>CAD$" + totalOrder.toFixed(2) + "</strong>";

        langara.set(parameter.outputID, outputMessage);
    };

    var registerHandlers = function () {

        langara.registerEventHandler(parameter.calculateID, 'click', calculateGrades);
    };

    registerHandlers();

})({
    nameID: "name",
    priceID: "price",
    quantytyID: "quantity",
    taxID: "tax",
    outputID: "answer",
    calculateID: "Calculate"
});