import { Vector } from "./Vector.js";
var Shape = /** @class */ (function () {
    function Shape(position, rotation) {
        if (rotation === void 0) { rotation = 0; }
        this.points = [];
        this.position = position;
        ;
        this.rotation = rotation;
    }
    Shape.prototype.RotatePoints = function () {
        var radAngle = this.rotation * (Math.PI / 180);
        var rotated = [];
        this.points.forEach(function (point) {
            var rotatedX = Math.cos(radAngle) * (point.X - 0) - Math.sin(radAngle) * (point.Y - 0) + 0;
            var rotatedY = Math.sin(radAngle) * (point.X - 0) + Math.cos(radAngle) * (point.Y - 0) + 0;
            rotated.push(new Vector(rotatedX, rotatedY));
        });
        return rotated;
    };
    Shape.prototype.DrawShape = function (x, y, context) {
        var rotatedPoints = this.RotatePoints();
        context.beginPath();
        context.moveTo(x + rotatedPoints[0].X, y + rotatedPoints[0].Y);
        for (var nCount = 1; nCount < rotatedPoints.length; nCount++) {
            context.lineTo(x + rotatedPoints[nCount].X, y + rotatedPoints[nCount].Y);
        }
        context.closePath();
    };
    return Shape;
}());
export { Shape };
//# sourceMappingURL=Shape.js.map