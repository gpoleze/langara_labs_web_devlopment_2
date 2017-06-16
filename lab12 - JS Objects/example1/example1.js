(function (parameter) {
    'use strict';

    function myScale() {
        var hw = document.getElementById(parameter.widthID).value;
        var hh = document.getElementById(parameter.heightID).value;
        var himg = document.getElementById(parameter.pictureID);

        himg.width = hw;
        himg.height = hh;
    }

    function myMove() {
        var hx = document.getElementById(parameter.xValID).value;
        var hy = document.getElementById(parameter.yValID).value;
        var himg = document.getElementById(parameter.pictureID);

        himg.style.left = hx + "px";
        himg.style.top = hy + "px";
    }

    function myMove2() {
        var step = 1;
        var time = 1;

        var hx = +document.getElementById(parameter.xValID).value;
        var hy = +document.getElementById(parameter.yValID).value;
        var himg = document.getElementById(parameter.pictureID);


        himg.style.left = hx + step + "px";
        himg.style.top = hy + step + "px";

        if (hx < window.innerHeight - 200) {
            move(parameter.xValID, hx, step);
            setTimeout(myMove2, time);
        } else if (hy < window.innerHeight - 200) {
            move(parameter.yValID, hy, step);
            setTimeout(myMove2, time);
        }
    }

    function myMove3() {
        var step = 1;
        var time = +document.getElementById(parameter.timeID).innerHTML;
        var xZero = +document.getElementById(parameter.xValID).value;
        var yZero = +document.getElementById(parameter.yValID).value;
        var himg = document.getElementById(parameter.pictureID);

        var hx = xZero;
        var hy = yZero;


        himg.style.left = hx + step + "px";
        himg.style.top = hy + step + "px";

        if (hx < window.innerHeight - 200 && hy < window.innerHeight - 200) {
            moveX(hx, step);
            moveY(0, 0, time, "down");
            document.getElementById(parameter.timeID).innerHTML = time + 1;
            setTimeout(myMove3, 1000);
        }
    }

    function move(elementID, now, step) {
        document.getElementById(elementID).value = now + step;
    }

    function moveY(hZero, vZero, deltaTime, upOrDown) {
        if (upOrDown == "up")
            var g = -10;
        if (upOrDown == "down")
            var g = 10;

        var h = hZero + vZero * deltaTime + 0.5 * g * Math.pow(deltaTime, 2);
        document.getElementById(parameter.yValID).value = h;

    }



    function reset() {
        document.getElementById(parameter.xValID).value = 0;
        document.getElementById(parameter.yValID).value = 0;
    }

    function checkFollow(event) {
        var hfollow = document.getElementById(parameter.followID).checked;
        if (hfollow) {
            var himg = document.getElementById(parameter.pictureID);
            //console.log(himg);
            himg.style.left = (event.clientX + 10) + "px";
            himg.style.top = (event.clientY + 10) + "px";

            document.getElementById(parameter.xValID).value = event.clientX + 10;
            document.getElementById(parameter.yValID).value = event.clientY + 10;
        }
    }


    var changeColor = function () {
        var color = document.getElementById(parameter.colorID).value;
        var heading = document.getElementById(parameter.headingID);
        console.log(color.toString());
        heading.style.color = color.toString();
    }

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.moveItID, 'click', myMove2);
        langara.registerEventHandler(parameter.scaleItID, 'click', myScale);
        langara.registerEventHandler(parameter.bodyTag, 'mousemove', checkFollow);
        langara.registerEventHandler(parameter.headingID, 'click', changeColor);
        langara.registerEventHandler(parameter.resetID, 'click', reset);
    };

    registerHandlers();

})({
    widthID: "width",
    heightID: "height",
    xValID: "xval",
    yValID: "yval",
    followID: "follow",
    pictureID: "picture",
    moveItID: "moveIt",
    scaleItID: "scaleIt",
    bodyTag: "everywhere",
    colorID: "headerColor",
    headingID: "the_heading",
    resetID: "reset",
    timeID: "time"
});