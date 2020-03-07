import { Vector } from "./Vector.js";
var Shape = /** @class */ (function () {
    function Shape(position, rotation) {
        if (rotation === void 0) { rotation = 0; }
        this.points = [];
        this.position = position;
        ;
        this.rotation = rotation;
    }
    Shape.prototype.RotatePoints = function (points) {
        var radAngle = this.rotation * (Math.PI / 180);
        var rotated = [];
        points.forEach(function (point) {
            var rotatedX = Math.cos(radAngle) * (point.X - 0) - Math.sin(radAngle) * (point.Y - 0) + 0;
            var rotatedY = Math.sin(radAngle) * (point.X - 0) + Math.cos(radAngle) * (point.Y - 0) + 0;
            rotated.push(new Vector(rotatedX, rotatedY));
        });
        return rotated;
    };
    Shape.prototype.DrawShape = function (context) {
        var rotatedPoints = this.RotatePoints(this.points);
        context.beginPath();
        context.moveTo(this.position.X + rotatedPoints[0].X, this.position.Y + rotatedPoints[0].Y);
        for (var nCount = 1; nCount < rotatedPoints.length; nCount++) {
            context.lineTo(this.position.X + rotatedPoints[nCount].X, this.position.Y + rotatedPoints[nCount].Y);
        }
        context.closePath();
        context.stroke();
    };
    return Shape;
}());
export { Shape };
//# sourceMappingURL=Shape.js.map