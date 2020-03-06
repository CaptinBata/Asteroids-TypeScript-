import { Asteroid } from "./Asteroid.js";
import { Ship } from "./Ship.js";
import { Vector } from "./Vector.js";
import { Utilities } from "./Utils.js";
var Game = /** @class */ (function () {
    function Game() {
        this.keys = [];
        this.asteroids = [];
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = this.GetWindowWidth();
        this.canvas.height = this.GetWindowHeight();
        this.context = this.canvas.getContext("2d");
        this.keys = new Array();
        this.ClearScreen();
    }
    Game.prototype.GetCirclePoints = function (radius, pointCount) {
        var incDegrees = 360 / pointCount;
        var points = [];
        for (var nCount = 0; nCount < pointCount; nCount++) {
            var degree = nCount * incDegrees;
            var radians = degree * (Math.PI / 180);
            var x = Math.cos(radians) * radius;
            var y = Math.sin(radians) * radius;
            points.push(new Vector(x, y));
        }
        return points;
    };
    Game.prototype.Update = function () {
        var _this = this;
        this.player.Update(this.keys);
        this.asteroids.forEach(function (asteroid) {
            asteroid.Bounced = false;
        });
        this.asteroids.forEach(function (asteroid) {
            asteroid.Update(_this.canvas, _this.asteroids);
        });
    };
    Game.prototype.ClearScreen = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Game.prototype.Draw = function () {
        var _this = this;
        this.ClearScreen();
        //this.player.Draw(this.context);
        this.asteroids.forEach(function (asteroid) {
            asteroid.Draw(_this.context);
        });
    };
    Game.prototype.GameLoop = function () {
        this.Update();
        this.Draw();
        window.requestAnimationFrame(this.GameLoop.bind(this));
    };
    Game.prototype.GenerateAsteroids = function (x, y) {
        for (var nCount = 0; nCount < 20; nCount++) {
            var radius = Utilities.RandomRange(30, 10);
            this.asteroids.push(new Asteroid(this.GetCirclePoints(radius, 35), new Vector(Utilities.RandomRange(this.canvas.width, 0), Utilities.RandomRange(this.canvas.height, 0)), radius, new Vector(Utilities.RandomRange(1, 0), Utilities.RandomRange(1, 0)), Utilities.RandomRange(2, 0.3)));
        }
    };
    Game.prototype.Start = function () {
        var x = this.canvas.width / 2;
        var y = this.canvas.height / 2;
        this.player = new Ship(new Vector(x, y));
        this.GenerateAsteroids(x, y);
        this.SetUpEvents();
        this.GameLoop();
    };
    Game.prototype.GetWindowWidth = function () {
        return window.innerWidth - 25;
    };
    Game.prototype.GetWindowHeight = function () {
        return window.innerHeight - 25;
    };
    Game.prototype.SetUpEvents = function () {
        var _this = this;
        window.addEventListener("keypress", function (e) {
            _this.keys.push(e.keyCode);
        });
    };
    return Game;
}());
var game = new Game();
game.Start();
//# sourceMappingURL=Game.js.map