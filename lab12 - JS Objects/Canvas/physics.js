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
});