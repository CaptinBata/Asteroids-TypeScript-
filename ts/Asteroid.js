var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Vector } from "./Vector.js";
import { Utilities } from "./Utils.js";
import { GameObject } from "./GameObject.js";
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(points, position, radius, directionVec, speed) {
        if (directionVec === void 0) { directionVec = new Vector(0, 0); }
        if (speed === void 0) { speed = 0; }
        var _this = _super.call(this, position) || this;
        _this.bounced = false;
        _this.radius = radius;
        _this.directionVec = directionVec;
        _this.speed = speed;
        var newPoints = [];
        var changeChance = 1.2;
        for (var nCount = 0; nCount < points.length; nCount++) {
            var x = points[nCount].X;
            var y = points[nCount].Y;
            if (Math.random() >= changeChance) {
                var norm = points[nCount].Normalise();
                x = norm.X * (Utilities.RandomRange(0.675, 1) * Utilities.RandomRange(radius, radius * 0.9));
                y = norm.Y * (Utilities.RandomRange(0.675, 1) * Utilities.RandomRange(radius, radius * 0.9));
                changeChance += 0.1;
            }
            else
                changeChance -= 0.1;
            newPoints.push(new Vector(x, y));
        }
        _this.points = newPoints;
        return _this;
    }
    Object.defineProperty(Asteroid.prototype, "Bounced", {
        get: function () {
            return this.bounced;
        },
        set: function (value) {
            this.bounced = value;
        },
        enumerable: true,
        configurable: true
    });
    Asteroid.prototype.CheckOffScreenBoundary = function (canvas) {
        if (this.position.X > canvas.width)
            this.position.X = 0;
        if (this.position.X < 0)
            this.position.X = canvas.width;
        if (this.position.Y > canvas.height)
            this.position.Y = 0;
        if (this.position.Y < 0)
            this.position.Y = canvas.height;
    };
    Asteroid.prototype.CheckCollisions = function (asteroid) {
        var centeredX = this.position.X - asteroid.position.X;
        var centeredY = this.position.Y - asteroid.position.Y;
        var R = Math.sqrt(centeredX * centeredX + centeredY * centeredY);
        if (!(Math.abs(this.radius - asteroid.radius) <= R && R <= this.radius + asteroid.radius))
            return [];
        var R2 = R * R;
        var R4 = R2 * R2;
        var a = (this.radius * this.radius - asteroid.radius * asteroid.radius) / (2 * R2);
        var r2r2 = (this.radius * this.radius - asteroid.radius * asteroid.radius);
        var c = Math.sqrt(2 * (this.radius * this.radius + asteroid.radius * asteroid.radius) / R2 - (r2r2 * r2r2) / R4 - 1);
        var fx = (this.position.X + asteroid.position.X) / 2 + a * (asteroid.position.X - this.position.X);
        var gx = c * (asteroid.position.Y - this.position.Y) / 2;
        var ix1 = fx + gx;
        var ix2 = fx - gx;
        var fy = (this.position.Y + asteroid.position.Y) / 2 + a * (asteroid.position.Y - this.position.Y);
        var gy = c * (this.position.X - asteroid.position.X) / 2;
        var iy1 = fy + gy;
        var iy2 = fy - gy;
        return [new Vector(ix1, iy1), new Vector(ix2, iy2)];
    };
    Asteroid.prototype.BounceAfterCollision = function (asteroid) {
        var collVector = new Vector(asteroid.position.X - this.position.X, asteroid.position.Y - this.position.Y);
        var collNormal = collVector.Normalise();
        this.directionVec = this.directionVec.SubtractVec(collNormal).Normalise();
        return asteroid.directionVec.AddVec(collNormal).Normalise();
    };
    Asteroid.prototype.Update = function (canvas, asteroids) {
        for (var nCount = 0; nCount < asteroids.length; nCount++) {
            if (asteroids[nCount] != this) {
                var intersections = this.CheckCollisions(asteroids[nCount]);
                if (intersections.length > 0 && this.bounced == false) {
                    var newVel = this.BounceAfterCollision(asteroids[nCount]);
                    asteroids[nCount].directionVec = newVel;
                    this.bounced = true;
                    asteroids[nCount].bounced = true;
                }
            }
        }
        this.CheckOffScreenBoundary(canvas);
        this.rotation += 0.1 + ((30 - this.radius) * (0.1 / 30)); //turn based on size
        this.ApplyMovement();
    };
    return Asteroid;
}(GameObject));
export { Asteroid };
//# sourceMappingURL=Asteroid.js.map