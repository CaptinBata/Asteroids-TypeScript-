import { Vector } from "./Vector.js";

class Shape {
    protected points: Vector[] = [];
    protected position: Vector;
    protected rotation: number;

    constructor(position: Vector, rotation: number = 0) {
        this.position = position;;
        this.rotation = rotation;
    }

    private RotatePoints() {
        let radAngle = this.rotation * (Math.PI / 180);
        let rotated: Vector[] = [];
        this.points.forEach(point => {
            let rotatedX = Math.cos(radAngle) * (point.X - 0) - Math.sin(radAngle) * (point.Y - 0) + 0;
            let rotatedY = Math.sin(radAngle) * (point.X - 0) + Math.cos(radAngle) * (point.Y - 0) + 0

            rotated.push(new Vector(rotatedX, rotatedY));
        });

        return rotated;
    }

    protected DrawShape(x: number, y: number, context: CanvasRenderingContext2D) {
        let rotatedPoints = this.RotatePoints();

        context.beginPath();
        context.moveTo(x + rotatedPoints[0].X, y + rotatedPoints[0].Y);
        for (var nCount = 1; nCount < rotatedPoints.length; nCount++) {
            context.lineTo(x + rotatedPoints[nCount].X, y + rotatedPoints[nCount].Y);
        }
        context.closePath();
    }
}

export { Shape }