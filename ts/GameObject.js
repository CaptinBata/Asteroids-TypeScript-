var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Shape } from "./Shape.js";
var GameObject = /** @class */ (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObject.prototype.Draw = function (context) {
        context.strokeStyle = "#ffffff";
        _super.prototype.DrawShape.call(this, context);
    };
    GameObject.prototype.ApplyMovement = function () {
        this.position = this.position.AddVec(this.directionVec.Multiply(this.speed));
    };
    GameObject.prototype.CheckOffScreenBoundary = function (canvas) {
        if (this.position.X > canvas.width)
            this.position.X = 0;
        if (this.position.X < 0)
            this.position.X = canvas.width;
        if (this.position.Y > canvas.height)
            this.position.Y = 0;
        if (this.position.Y < 0)
            this.position.Y = canvas.height;
    };
    return GameObject;
}(Shape));
export { GameObject };
//# sourceMappingURL=GameObject.js.map