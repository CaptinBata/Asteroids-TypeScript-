import { Asteroid } from "./Asteroid.js"
import { Ship } from "./Ship.js"
import { Vector } from "./Vector.js";
import { Utilities } from "./Utils.js";

class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private keys: number[] = [];
    private asteroids: Asteroid[] = [];
    private player: Ship;

    constructor() {
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.canvas.width = this.GetWindowWidth();
        this.canvas.height = this.GetWindowHeight();

        this.context = this.canvas.getContext("2d");
        this.keys = new Array<number>();

        this.ClearScreen();
    }

    private GetCirclePoints(radius: number, pointCount: number) {
        let incDegrees = 360 / pointCount;
        let points: Vector[] = [];

        for (var nCount = 0; nCount < pointCount; nCount++) {
            let degree = nCount * incDegrees;
            let radians = degree * (Math.PI / 180);

            let x = Math.cos(radians) * radius;
            let y = Math.sin(radians) * radius;

            points.push(new Vector(x, y));
        }
        return points;
    }

    private Update() {
        this.player.Update(this.keys);

        this.asteroids.forEach(asteroid => {
            asteroid.Bounced = false;
        });

        this.asteroids.forEach(asteroid => {
            asteroid.Update(this.canvas, this.asteroids);
        });
        this.keys = [];
    }

    private ClearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private Draw() {
        this.ClearScreen();

        this.player.Draw(this.context);
        this.asteroids.forEach(asteroid => {
            //     asteroid.Draw(this.context);
        });
    }

    private GameLoop() {
        this.Update();
        this.Draw();
        window.requestAnimationFrame(this.GameLoop.bind(this));
    }

    private GenerateAsteroids(x: number, y: number) {
        for (var nCount = 0; nCount < 20; nCount++) {
            let radius = Utilities.RandomRange(30, 10);
            this.asteroids.push(new Asteroid(
                this.GetCirclePoints(radius, 35),
                new Vector(
                    Utilities.RandomRange(this.canvas.width, 0),
                    Utilities.RandomRange(this.canvas.height, 0)),
                radius,
                new Vector(
                    Utilities.RandomRange(1, 0),
                    Utilities.RandomRange(1, 0)),
                Utilities.RandomRange(2, 0.3)));
        }
    }

    public Start() {
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        this.player = new Ship(new Vector(x, y));

        this.GenerateAsteroids(x, y);
        this.SetUpEvents();
        this.GameLoop();
    }

    private GetWindowWidth(): number {
        return window.innerWidth - 25;
    }

    private GetWindowHeight(): number {
        return window.innerHeight - 25;
    }

    private SetUpEvents() {
        window.addEventListener("keypress", (e) => {
            this.keys.push(e.keyCode);
        });
    }
}

var game = new Game();
game.Start();

