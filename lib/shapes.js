// shapes.js
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    getSVG(color, x, y) {
        return `<g transform="translate(${x},${y})">
                    <circle cx="${this.radius}" cy="${this.radius}" r="${this.radius}" fill="${color}" />
                </g>`;
    }

    getWidth() {
        return this.radius * 2; // Diameter of the circle
    }

    getHeight() {
        return this.radius * 2; // Diameter of the circle
    }
}

class Triangle {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }

    getSVG(color, x, y) {
        return `<g transform="translate(${x},${y})">
                    <polygon points="0,${this.sideLength} ${this.sideLength / 2},0 ${this.sideLength},${this.sideLength}" fill="${color}" />
                </g>`;
    }

    getWidth() {
        return this.sideLength; // Width of the triangle
    }

    getHeight() {
        return (Math.sqrt(3) / 2) * this.sideLength; // Height of the triangle
    }
}

class Square {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }

    getSVG(color, x, y) {
        return `<g transform="translate(${x},${y})">
                    <rect width="${this.sideLength}" height="${this.sideLength}" fill="${color}" />
                </g>`;
    }

    getWidth() {
        return this.sideLength; // Width of the square
    }

    getHeight() {
        return this.sideLength; // Height of the square
    }
}

module.exports = { Circle, Triangle, Square };

