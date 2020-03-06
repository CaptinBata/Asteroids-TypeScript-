import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";
import { GameObject } from "./GameObject.js";

class Ship extends GameObject {

    constructor(position: Vector, directionVec: Vector = new Vector(0, 0), speed: number = 0) {
        super(position);
        this.directionVec = directionVec;
        this.speed = speed;
        this.AddShapePoints();
    }

    private AddShapePoints() {
        this.points.push(new Vector(-18, 24));
        this.points.push(new Vector(0, -24));
        this.points.push(new Vector(18, 24));
        this.points.push(new Vector(0, 18));
    }

    public Update(keys: number[]) {
        this.position.Y -= 1;
    }

    public Draw(context: CanvasRenderingContext2D) {
        let x = this.position.X;
        let y = this.position.Y;

        context.strokeStyle = "#ffffff";
        super.DrawShape(x, y, context);
        context.stroke();
    }
}

export { Ship }