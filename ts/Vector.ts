class Vector {
    private x: number;
    get X(): number {
        return this.x;
    }
    set X(value: number) {
        this.x = value;
    }
    private y: number;

    get Y(): number {
        return this.y;
    }
    set Y(value: number) {
        this.y = value;
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public Normalise() {
        let length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return new Vector(this.x / length, this.y / length);
    }

    public DotProduct(vector: Vector) {
        let x = this.X * vector.X;
        let y = this.X * vector.Y;
        return x + y;
    }

    public Add(num: number) {
        let x = this.X + num;
        let y = this.Y + num;
        return new Vector(x, y);
    }

    public AddVec(vec: Vector) {
        let x = this.X + vec.X;
        let y = this.Y + vec.Y;
        return new Vector(x, y);
    }

    public Subtract(num: number) {
        let x = this.X - num;
        let y = this.Y - num;
        return new Vector(x, y);
    }

    public SubtractVec(vec: Vector) {
        let x = this.X - vec.X;
        let y = this.Y - vec.Y;
        return new Vector(x, y);
    }
    public Multiply(num: number) {
        let x = this.X * num;
        let y = this.Y * num;
        return new Vector(x, y);
    }

    public MultiplyVec(vec: Vector) {
        let x = this.X * vec.X;
        let y = this.Y * vec.Y;
        return new Vector(x, y);
    }

    public Division(num: number) {
        let x = this.X / num;
        let y = this.Y / num;
        return new Vector(x, y);
    }

    public DivisionVec(vec: Vector) {
        let x = this.X / vec.X;
        let y = this.Y / vec.Y;
        return new Vector(x, y);
    }

}

export { Vector }