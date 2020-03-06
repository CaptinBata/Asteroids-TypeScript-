import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";

class GameObject extends Shape {
    protected directionVec: Vector;
    protected speed: number;

    public Draw(context: CanvasRenderingContext2D) {
        let x = this.position.X;
        let y = this.position.Y;

        context.strokeStyle = "#ffffff";
        super.DrawShape(x, y, context);
        context.stroke();
    }
}

export { GameObject }