var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Y", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.Normalise = function () {
        var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return new Vector(this.x / length, this.y / length);
    };
    Vector.prototype.DotProduct = function (vector) {
        var x = this.X * vector.X;
        var y = this.X * vector.Y;
        return x + y;
    };
    Vector.prototype.Add = function (num) {
        var x = this.X + num;
        var y = this.Y + num;
        return new Vector(x, y);
    };
    Vector.prototype.AddVec = function (vec) {
        var x = this.X + vec.X;
        var y = this.Y + vec.Y;
        return new Vector(x, y);
    };
    Vector.prototype.Subtract = function (num) {
        var x = this.X - num;
        var y = this.Y - num;
        return new Vector(x, y);
    };
    Vector.prototype.SubtractVec = function (vec) {
        var x = this.X - vec.X;
        var y = this.Y - vec.Y;
        return new Vector(x, y);
    };
    Vector.prototype.Multiply = function (num) {
        var x = this.X * num;
        var y = this.Y * num;
        return new Vector(x, y);
    };
    Vector.prototype.MultiplyVec = function (vec) {
        var x = this.X * vec.X;
        var y = this.Y * vec.Y;
        return new Vector(x, y);
    };
    Vector.prototype.Division = function (num) {
        var x = this.X / num;
        var y = this.Y / num;
        return new Vector(x, y);
    };
    Vector.prototype.DivisionVec = function (vec) {
        var x = this.X / vec.X;
        var y = this.Y / vec.Y;
        return new Vector(x, y);
    };
    return Vector;
}());
export { Vector };
//# sourceMappingURL=Vector.js.map