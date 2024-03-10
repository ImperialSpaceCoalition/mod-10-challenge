// shapes.js

class Triangle {
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }

    area() {
        return 0.5 * this.base * this.height;
    }
}

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Square {
    constructor(side) {
        this.side = side;
    }

    area() {
        return this.side * this.side;
    }
}

module.exports = { Triangle, Circle, Square };
