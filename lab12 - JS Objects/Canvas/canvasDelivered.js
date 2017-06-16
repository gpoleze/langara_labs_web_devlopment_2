(function (parameter) {
    'use strict';

    class Physics {
        static space(sZero, vZero, acceleration, t, tZero) {
            var t0 = tZero || 0;
            var deltaT = t - t0;

            return sZero + vZero * deltaT + 0.5 * acceleration * Math.pow(deltaT, 2);
        }

        static velocity(vZero, acceleration, t, tZero) {
            var t0 = tZero || 0;
            var deltaT = t - t0;

            return vZero + acceleration * deltaT;
        }

        static torricelli(vZero, acceleration, s, sZero) {
            var s0 = sZero || 0;
            var deltaS = s - s0;

            return Math.sqrt(Math.pow(vZero, 2) + 2 * acceleration * deltaS);
        }
    }

    //Circle Class
    //Fields
    function Circle(x, y, radius, strokeColor, fillColor, borderWidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.borderWidth = borderWidth;
    }

    //Methods
    Circle.prototype.draw = function (context, xInput, yInput, radiusInput) {
        this.x = xInput || +langara.get(parameter.xInitialID);
        this.y = yInput || +langara.get(parameter.yInitialID);
        this.radius = radiusInput || +langara.get(parameter.radiusInitialID);
        this.fillColor = langara.get(parameter.fillID);
        this.strokeColor = langara.get(parameter.borderID);
        this.borderWidth = langara.get(parameter.borderWidthID);

        // context.clearRect(0, 0, 500, 500);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.fillColor;
        context.fill();
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
        context.closePath();
    }

    Circle.prototype.drawAleatory = function (context, min, max) {
        var x = this.aleatory(min + (+this.radius), max - (+this.radius));
        var y = this.aleatory(min + (+this.radius), max - (+this.radius));
        this.draw(context, x, y);
    }

    Circle.prototype.aleatory = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    //FreeFall

    Circle.prototype.movement = function (context, x, y, time, velocity, acceleration, end) {
        //draw circle with old values
        this.draw(context, x, y);

        // add step
        x = x;
        y = Physics.space(y, velocity, acceleration, time / 1000);
        velocity = Physics.velocity(velocity, acceleration, time / 1000);

        //call function again with setTimeou
        if (y <= end)
            setTimeout(this.movement(context, x, y, time, velocity, acceleration, end), time);
    }


    //Why it is so fast???? and Why it is not drawing????
    Circle.prototype.freeFall = function (context, start, end) {
        var time = 500;
        var g = 9.8;
        var v = 0;
        var x = start + this.radius;
        var y = start + this.radius;
        this.radius;

        this.movement(context, x, y, time, v, g, end);

    }



    //Object Intantiation
    var canvas = document.getElementById(parameter.canvasID);
    var ctx = canvas.getContext("2d");
    var circle = new Circle(langara.get(parameter.xInitialID), langara.get(parameter.yInitialID), +langara.get(parameter.radiusInitialID), langara.get(parameter.borderID), langara.get(parameter.fillID), langara.get(parameter.borderWidthID));

    function clearCanvas() {
        canvas.width = canvas.width;
    }


    var keepGoing = false;

    function starMoving() {

        if (keepGoing)
            keepGoing = false;
        else
            keepGoing = true;
        moveDown({
            x: 50,
            y: 50,
            step: 2
        })
    }

    function moveDown(data) {

        if (keepGoing) {
            langara.set(parameter.moveDownID, "Stop");

            var time = 1;


            circle.draw(ctx, data.x, data.y);

            data.y += data.step;


            if (circle.radius > data.y || data.y > canvas.height - circle.radius)
                data.step = -data.step;

            setTimeout(function () {
                moveDown(data)
            }, time)
        } else {
            langara.set(parameter.moveDownID, "Move Down");
        }
    }

    function freeFall() {
        if (keepGoing)
            keepGoing = false;
        else {
            keepGoing = true;

            var setup1 = {
                time: 100,
                g: 9.8,
                v: 0,
                x: 100,
                y: 50,
                velocity: 0,
                endX: canvas.width - circle.radius,
                endY: canvas.height - circle.radius,
            }


            bounce(setup1);

        }
    }

    function bounce(data) {
        if (keepGoing) {
            langara.set(parameter.fallingID, "Stop");

            circle.draw(ctx, data.x, data.y);

            data.y = Math.floor(Physics.space(data.y, data.velocity, data.g, data.time / 100));
            data.velocity = Physics.velocity(data.velocity, data.g, data.time / 100);

            if (data.y >= data.endY)
                data.velocity = -data.velocity;

            if (data.y <= circle.radius * 1)
                data.velocity = 0;
            setTimeout(function () {
                bounce(data)
            }, data.time);

        } else {
            langara.set(parameter.fallingID, "Free Fall");
        }
    }

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.drawStaticID, 'click', function () {
            circle.draw(ctx);
        });

        langara.registerEventHandler(parameter.drawRandomID, 'click', function () {
            circle.drawAleatory(ctx, 0, canvas.width);
        });

        langara.registerEventHandler(parameter.fallingID, 'click', freeFall);

        langara.registerEventHandler(parameter.moveDownID, 'click', starMoving);

        langara.registerEventHandler(parameter.clearID, 'click', clearCanvas);


    }

    registerHandlers();

})({
    clearID: "clear",
    drawStaticID: "drawStatic",
    xInitialID: "xInitial",
    yInitialID: "yInitial",
    radiusInitialID: "radiusInitial",
    borderID: "borderColor",
    fillID: "fillColor",
    borderWidthID: "borderWidth",
    drawRandomID: "drawRandom",
    fallingID: "falling",
    moveDownID: "moveDown",
    canvasID: "myCanvas",

});