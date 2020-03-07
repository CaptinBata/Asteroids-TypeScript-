import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";
import { GameObject } from "./GameObject.js";

class Ship extends GameObject {
    forwardVectors: Vector[] = [];
    forwardVector: Vector;

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

        this.forwardVectors.push(new Vector(0, -24));
        this.forwardVectors.push(new Vector(0, -25));
    }

    private ApplyKeyInputs(keys: number[]) {
        let keysPressed: number = 0;

        keys.forEach(key => {
            keysPressed += 1;
            switch (key) {
                case 119:
                    this.speed += 0.5;
                    if (this.speed > 5)
                        this.speed = 5;

                    this.directionVec = this.directionVec.AddVec(this.forwardVector);
                    this.directionVec = this.directionVec.Normalise();
                    break;
                case 97:
                    this.rotation -= 5;
                    break;
                case 100:
                    this.rotation += 5;
                    break;
            }
        });

        if (keysPressed == 0)
            this.speed -= 0.5;
    }

    private CalculateForwardVector() {
        let rotatedVectors = this.RotatePoints(this.forwardVectors);
        return rotatedVectors[0].SubtractVec(rotatedVectors[1]).Normalise();
    }

    public Update(keys: number[]) {
        this.forwardVector = this.CalculateForwardVector();

        this.ApplyKeyInputs(keys);

        this.ApplyMovement();
    }
}

export { Ship }