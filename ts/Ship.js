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
import { GameObject } from "./GameObject.js";
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(position, directionVec, speed) {
        if (directionVec === void 0) { directionVec = new Vector(0, 0); }
        if (speed === void 0) { speed = 0; }
        var _this = _super.call(this, position) || this;
        _this.forwardVectors = [];
        _this.directionVec = directionVec;
        _this.speed = speed;
        _this.AddShapePoints();
        return _this;
    }
    Ship.prototype.AddShapePoints = function () {
        this.points.push(new Vector(-18, 24));
        this.points.push(new Vector(0, -24));
        this.points.push(new Vector(18, 24));
        this.points.push(new Vector(0, 18));
        this.forwardVectors.push(new Vector(0, -24));
        this.forwardVectors.push(new Vector(0, -25));
    };
    Ship.prototype.ApplyKeyInputs = function (keys) {
        var _this = this;
        var keysPressed = 0;
        keys.forEach(function (key) {
            keysPressed += 1;
            switch (key) {
                case 119:
                    _this.speed += 0.5;
                    if (_this.speed > 5)
                        _this.speed = 5;
                    _this.directionVec = _this.directionVec.AddVec(_this.forwardVector);
                    _this.directionVec = _this.directionVec.Normalise();
                    break;
                case 97:
                    _this.rotation -= 5;
                    break;
                case 100:
                    _this.rotation += 5;
                    break;
            }
        });
        if (keysPressed == 0)
            if (this.speed > 0)
                this.speed -= 0.01;
    };
    Ship.prototype.CalculateForwardVector = function () {
        var rotatedVectors = this.RotatePoints(this.forwardVectors);
        return rotatedVectors[1].SubtractVec(rotatedVectors[0]).Normalise();
    };
    Ship.prototype.Update = function (keys, canvas) {
        this.forwardVector = this.CalculateForwardVector();
        this.ApplyKeyInputs(keys);
        this.ApplyMovement();
        this.CheckOffScreenBoundary(canvas);
    };
    return Ship;
}(GameObject));
export { Ship };
//# sourceMappingURL=Ship.js.map