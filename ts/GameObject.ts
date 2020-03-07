import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";

class GameObject extends Shape {
    protected directionVec: Vector;
    protected speed: number;

    public Draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = "#ffffff";
        super.DrawShape(context);
    }

    protected ApplyMovement() {
        this.position = this.position.AddVec(this.directionVec.Multiply(this.speed));
    }
}

export { GameObject }