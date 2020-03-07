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


    protected CheckOffScreenBoundary(canvas: HTMLCanvasElement) {
        if (this.position.X > canvas.width)
            this.position.X = 0;
        if (this.position.X < 0)
            this.position.X = canvas.width;

        if (this.position.Y > canvas.height)
            this.position.Y = 0;
        if (this.position.Y < 0)
            this.position.Y = canvas.height;
    }
}

export { GameObject }