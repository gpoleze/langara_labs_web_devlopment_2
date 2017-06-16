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

    class Circle {

        constructor(x, y, radius, strokeColor, fillColor) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }

        get area() {
            return this.calcArea();
        }

        calcArea() {
            return Math.pow(this.radius, 2) * Math.PI;
        }

        draw(context, xValue, yValue) {
            var xValue = xValue || this.x;
            var yValue = yValue || this.y;

            context.beginPath();
            context.arc(xValue, yValue, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = this.fillColor;
            context.fill();
            context.strokeStyle = this.strokeColor;
            context.stroke();
        }

        drawAleatory(context, min, max) {
            var x = Circle.aleatory(min + this.radius, max - this.radius);
            var y = Circle.aleatory(min + this.radius, max - this.radius);
            this.draw(context, x, y);
        }

        static aleatory(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        movement(context, x, y, time, velocity, acceleration, end) {
            //draw circle with old values
            //            context.clearRect(0, 0, 500, 500);
            this.draw(context, x, y);

            // add step
            x = x;
            y = Physics.space(y, velocity, acceleration, time / time);
            velocity = Physics.velocity(velocity, acceleration, time / time);

            //call function again with setTimeou
            if (y <= end)
                setTimeout(this.movement(context, x, y, time, velocity, acceleration, end), time);
        }

        freeFall(context, start, end) {
            var time = 10000;
            var g = 9.8;
            var v = 0;
            var x = start + this.radius;
            var y = start + this.radius;
            this.radius;

            this.movement(context, x, y, time, v, g, end);

        }

        moveDown(context, start, end) {
            //            context.clearRect(0, 0, 500, 500);
            this.draw(context, start.x + this.radius, start.y + this.radius);

            var step = 1;
            start.y = start.y + step;

            if (start.x <= end.x && start.y <= end.y)
                setTimeout(this.moveDown(context, {
                    x: start.x,
                    y: start.y
                }, end), 1000);


        }

    }





    //Object Intantiation
    var canvas = document.getElementById(parameter.canvasID);
    var ctx = canvas.getContext("2d");
    var circle = new Circle(100, 100, 50, "black", "blue");


    function clearCanvas() {
        canvas.width = canvas.width;
    }

    var registerHandlers = function () {
        langara.registerEventHandler(parameter.drawStaticID, 'click', function () {
            circle.draw(ctx);
        });

        langara.registerEventHandler(parameter.drawRandomID, 'click', function () {
            circle.drawAleatory(ctx, 0, canvas.width);
        });

        langara.registerEventHandler(parameter.fallingID, 'click', function () {
            circle.freeFall(ctx, 0, canvas.height);
        });

        langara.registerEventHandler(parameter.moveDownID, 'click', function () {
            circle.moveDown(ctx, {
                x: 0,
                y: 0
            }, {
                x: canvas.width,
                y: canvas.height
            });
        });

        langara.registerEventHandler(parameter.clearID, 'click', clearCanvas);

    }

    registerHandlers();

})({
    clearID: "clear",
    drawStaticID: "drawStatic",
    drawRandomID: "drawRandom",
    fallingID: "falling",
    moveDownID: "moveDown",
    canvasID: "myCanvas",


});