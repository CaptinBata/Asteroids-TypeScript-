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
    };
    Ship.prototype.Update = function (keys) {
        this.position.Y -= 1;
    };
    Ship.prototype.Draw = function (context) {
        var x = this.position.X;
        var y = this.position.Y;
        context.strokeStyle = "#ffffff";
        _super.prototype.DrawShape.call(this, x, y, context);
        context.stroke();
    };
    return Ship;
}(GameObject));
export { Ship };
//# sourceMappingURL=Ship.js.map