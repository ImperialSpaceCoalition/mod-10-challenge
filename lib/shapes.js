class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    getSVG() {
        return `<circle cx="150" cy="100" r="${this.radius}" />`;
    }
}

class Triangle {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }

    getSVG() {
        const height = (Math.sqrt(3) / 2) * this.sideLength;
        const points = `150,${100 + height / 3} ${150 - this.sideLength / 2},${100 - height / 3} ${150 + this.sideLength / 2},${100 - height / 3}`;
        return `<polygon points="${points}" />`;
    }
}

class Square {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }

    getSVG() {
        return `<rect x="${150 - this.sideLength / 2}" y="${100 - this.sideLength / 2}" width="${this.sideLength}" height="${this.sideLength}" />`;
    }
}

module.exports = { Circle, Triangle, Square };

