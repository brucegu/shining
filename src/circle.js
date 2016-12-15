export default class Circle {
    constructor(radius) {
        this.radius = radius;
        Circle.circlesMade++;
    };
    static draw(circle, canvas) {
    }
    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };
    get radius() {
        return this._radius;
    };
    set radius(radius) {
        if (!Number.isInteger(radius)) throw new Error("radius is not a number!");
        this._radius = radius;
    };
}