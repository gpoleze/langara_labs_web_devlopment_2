(function (parameter) {
    'use strict';

    var getResults = function () {
        var uname = langara.get(parameter.unameID);
        var pass = langara.get(parameter.passwordID);
        var instructions = langara.get(parameter.instructionsID);
        var size = langara.get(parameter.sizeID);
        var cheese = langara.get(parameter.cheeseID);
        var pepperoni = langara.get(parameter.pepperoniID);
        var mushrooms = langara.get(parameter.mushroomsID);
        var peppers = langara.get(parameter.peppersID);
        var buyButton = langara.get(parameter.buyButtonID);
        var order = langara.get(parameter.orderID);

        var result = "";
        var total = 0;

        result += "Username: " + uname + "<br />";
        result += "Password: " + pass + "<br />";
        result += "Instructions: " + instructions + "<br />";


        result += "You pizza size is : " + size + "<br />";
        total += sizePrize();

        result += "The topping(s) for your pizza is(are): ";
        if (cheese) {
            result += " Extra cheese,";
            total += 2;
        }
        if (pepperoni) {
            result += " Pepperoni,"
            total += 1;
        }
        if (mushrooms) {
            result += " Mushrooms,"
            total += 1
        };
        if (peppers) {
            result += " Green Peppers"
            total += 1
        };
        result += "<br />";

        result += "<h3>The total amout due is: CAD$" + total + "</h3>";

        langara.set(parameter.orderID, result);

    };


    var sizePrize = function () {
        if (size.value === "Small") return 10;
        if (size.value === "Medium") return 15;
        if (size.value === "Large") return 20;
    };

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.buyButtonID, 'click', getResults);
    };

    registerHandlers();

    // notice how the function parameters below are grouped into their 
    // broad categories: inputs, outputs, buttons, etc. This is only a convenience 
    // for the programmer - very useful convenience!

})({
    unameID: "uname",
    passwordID: "pass",
    instructionsID: "instructions",
    sizeID: "size",
    cheeseID: "cheese",
    pepperoniID: "pepperoni",
    mushroomsID: "mushrooms",
    peppersID: "peppers",
    buyButtonID: "buyButton",
    orderID: "order",
});