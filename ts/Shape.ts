import { Vector } from "./Vector.js";

class Shape {
    protected points: Vector[] = [];
    protected position: Vector;
    protected rotation: number;

    constructor(position: Vector, rotation: number = 0) {
        this.position = position;;
        this.rotation = rotation;
    }

    protected RotatePoints(points: Vector[]) {
        let radAngle = this.rotation * (Math.PI / 180);
        let rotated: Vector[] = [];
        points.forEach(point => {
            let rotatedX = Math.cos(radAngle) * (point.X - 0) - Math.sin(radAngle) * (point.Y - 0) + 0;
            let rotatedY = Math.sin(radAngle) * (point.X - 0) + Math.cos(radAngle) * (point.Y - 0) + 0

            rotated.push(new Vector(rotatedX, rotatedY));
        });

        return rotated;
    }

    protected DrawShape(context: CanvasRenderingContext2D) {
        let rotatedPoints = this.RotatePoints(this.points);

        context.beginPath();
        context.moveTo(this.position.X + rotatedPoints[0].X, this.position.Y + rotatedPoints[0].Y);
        for (var nCount = 1; nCount < rotatedPoints.length; nCount++) {
            context.lineTo(this.position.X + rotatedPoints[nCount].X, this.position.Y + rotatedPoints[nCount].Y);
        }
        context.closePath();
        context.stroke();
    }
}

export { Shape }