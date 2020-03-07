import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";
import { Utilities } from "./Utils.js";
import { GameObject } from "./GameObject.js"

class Asteroid extends GameObject {
    radius: number;
    bounced: boolean = false;
    get Bounced(): boolean {
        return this.bounced;
    }
    set Bounced(value: boolean) {
        this.bounced = value;
    }

    constructor(points: Vector[], position: Vector, radius: number, directionVec: Vector = new Vector(0, 0), speed: number = 0) {
        super(position);
        this.radius = radius;
        this.directionVec = directionVec;
        this.speed = speed;
        let newPoints: Vector[] = [];

        let changeChance = 1.2;

        for (var nCount = 0; nCount < points.length; nCount++) {
            let x = points[nCount].X;
            let y = points[nCount].Y;

            if (Math.random() >= changeChance) {
                let norm = points[nCount].Normalise();
                x = norm.X * (Utilities.RandomRange(0.675, 1) * Utilities.RandomRange(radius, radius * 0.9));
                y = norm.Y * (Utilities.RandomRange(0.675, 1) * Utilities.RandomRange(radius, radius * 0.9));
                changeChance += 0.1;
            }
            else
                changeChance -= 0.1;

            newPoints.push(new Vector(x, y));
        }

        this.points = newPoints;
    }

    private CheckCollisions(asteroid: Asteroid) {
        let centeredX = this.position.X - asteroid.position.X;
        let centeredY = this.position.Y - asteroid.position.Y;
        let R = Math.sqrt(centeredX * centeredX + centeredY * centeredY);
        if (!(Math.abs(this.radius - asteroid.radius) <= R && R <= this.radius + asteroid.radius))
            return [];

        let R2 = R * R;
        let R4 = R2 * R2;
        let a = (this.radius * this.radius - asteroid.radius * asteroid.radius) / (2 * R2);
        let r2r2 = (this.radius * this.radius - asteroid.radius * asteroid.radius);
        let c = Math.sqrt(2 * (this.radius * this.radius + asteroid.radius * asteroid.radius) / R2 - (r2r2 * r2r2) / R4 - 1);

        let fx = (this.position.X + asteroid.position.X) / 2 + a * (asteroid.position.X - this.position.X);
        let gx = c * (asteroid.position.Y - this.position.Y) / 2;
        let ix1 = fx + gx;
        let ix2 = fx - gx;

        let fy = (this.position.Y + asteroid.position.Y) / 2 + a * (asteroid.position.Y - this.position.Y);
        let gy = c * (this.position.X - asteroid.position.X) / 2;
        let iy1 = fy + gy;
        let iy2 = fy - gy;

        return [new Vector(ix1, iy1), new Vector(ix2, iy2)];
    }

    private BounceAfterCollision(asteroid: Asteroid) {
        let collVector = new Vector(asteroid.position.X - this.position.X, asteroid.position.Y - this.position.Y);
        let collNormal = collVector.Normalise();

        this.directionVec = this.directionVec.SubtractVec(collNormal).Normalise();
        return asteroid.directionVec.AddVec(collNormal).Normalise();
    }

    public Update(canvas: HTMLCanvasElement, asteroids: Asteroid[]) {
        for (var nCount = 0; nCount < asteroids.length; nCount++) {
            if (asteroids[nCount] != this) {
                let intersections = this.CheckCollisions(asteroids[nCount]);
                if (intersections.length > 0 && this.bounced == false) {
                    let newVel = this.BounceAfterCollision(asteroids[nCount]);
                    asteroids[nCount].directionVec = newVel;
                    this.bounced = true;
                    asteroids[nCount].bounced = true;
                }
            }
        }

        this.CheckOffScreenBoundary(canvas);

        this.rotation += 0.1 + ((30 - this.radius) * (0.1 / 30))  //turn based on size
        this.ApplyMovement();
    }
}

export { Asteroid }
