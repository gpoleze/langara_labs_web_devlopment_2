(function (parameter) {
    'use strict';

    var getResults = function () {
        var uname = langara.get(parameter.unameID);
        var pass = langara.get(parameter.passwordID);
        var comment = langara.get(parameter.commentID);
        var r_everything = langara.get(parameter.everythingID);
        var r_metal = langara.get(parameter.metalID);
        var r_jazz = langara.get(parameter.jazzID);
        var r_hiphop = langara.get(parameter.hiphopID);
        var c_fire = langara.get(parameter.fireID);
        var c_snowboard = langara.get(parameter.snowboardID);
        var c_movies = langara.get(parameter.moviesID);
        var country = langara.get(parameter.countryID);

        var result = "";

        result += "Username: " + uname + "<br />";
        result += "Password: " + pass + "<br />";
        result += "Comment: " + comment + "<br />";

        result += "Music : ";
        if (r_everything) result += " everything";
        if (r_metal) result += " metal";
        if (r_jazz) result += " jazz";
        if (r_hiphop) result += " hip hop";
        result += "<br />";

        result += "Winter: ";
        if (c_fire) result += " Sit by Fire,";
        if (c_snowboard) result += " Go Snowbarding,";
        if (c_movies) result += " Go to movies";
        result += "<br />";

        result += "Country : " + country + "<br />";

        langara.set(parameter.answerID, result);

        var n = parseInt(langara.get(parameter.listLengthID));

        var list_result = "";

        for (var i = 1; i <= n; i++) {
            list_result += "<li>Item #" + i + "</li>";
        }

        langara.set(parameter.outputListID, list_result);
    };

    var adjustHeading = function () {
        var heading = langara.get(parameter.theHeadingID, true);
        if (langara.hasClass(heading, "flashy"))
            langara.removeClass(heading, "flashy");
        else
            langara.addClass(heading, "flashy");
    };

    var addItem = function () {
        var theItem = langara.get(parameter.newItemID);
        if (theItem) {
            var newElement = document.createElement("option");
            var allCountries = langara.get(parameter.countryID, true);
            newElement.text = theItem;
            //newElement.value =   // to set the specific value for the text
            allCountries.add(newElement, null);
        }
    };

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.goButtonID, 'click', getResults);
        langara.registerEventHandler(parameter.changeHeadingID, 'click', adjustHeading);
        langara.registerEventHandler(parameter.addItemToListID, 'click', addItem);
    };

    registerHandlers();

    // notice how the function parameters below are grouped into their 
    // broad categories: inputs, outputs, buttons, etc. This is only a convenience 
    // for the programmer - very useful convenience!

})({
    unameID: "uname",
    passwordID: "pass",
    commentID: "comment",
    everythingID: "r_everything",
    metalID: "r_metal",
    jazzID: "r_jazz",
    hiphopID: "r_hiphop",
    fireID: "c_fire",
    snowboardID: "c_snowboard",
    moviesID: "c_movies",
    countryID: "country",
    newItemID: "newitem",
    listLengthID: "llength",
    answerID: "answer",
    outputListID: "list1",
    theHeadingID: "go_here",
    goButtonID: "GoButton",
    changeHeadingID: "changeheading",
    addItemToListID: "addNewItem"
});