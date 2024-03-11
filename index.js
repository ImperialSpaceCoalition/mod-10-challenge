// Require necessary modules
const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Define basic color options
const colorOptions = [
    'black',
    'white',
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'gray',
];

// Define function to prompt user for input
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter text:',
            validate: function (input) {
                return input.trim() ? true : 'Text is required.';
            }
        },
        {
            type: 'list',
            name: 'textColor',
            message: 'Choose a text color:',
            choices: colorOptions,
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['Circle', 'Triangle', 'Square']
        },
        {
            type: 'list',
            name: 'shapeColor',
            message: 'Choose a shape color:',
            choices: colorOptions, // Use the color options array
        },
        {
            type: 'input',
            name: 'sideLength',
            message: 'Enter side length (for Triangle/Square):',
            when: function (answers) {
                return answers.shape === 'Triangle' || answers.shape === 'Square';
            },
            validate: function (input) {
                const num = parseFloat(input);
                return !isNaN(num) && num > 0 ? true : 'Please enter a valid positive number.';
            }
        },
        {
            type: 'input',
            name: 'radius',
            message: 'Enter radius (for Circle):',
            when: function (answers) {
                return answers.shape === 'Circle';
            },
            validate: function (input) {
                const num = parseFloat(input);
                return !isNaN(num) && num > 0 ? true : 'Please enter a valid positive number.';
            }
        }
    ]);
}

// Define function to generate SVG based on user input
function generateSVG(data) {
    let shape;
    switch (data.shape) {
        case 'Circle':
            shape = new Circle(data.radius);
            break;
        case 'Triangle':
            shape = new Triangle(data.sideLength);
            break;
        case 'Square':
            shape = new Square(data.sideLength);
            break;
        default:
            throw new Error('Invalid shape selection.');
    }

    // Calculate shape position to center it
    const shapeX = 150 - (shape.getWidth() / 2); // Center shape horizontally
    const shapeY = 100 - (shape.getHeight() / 2); // Center shape vertically

    // Map color keywords to hexadecimal values
    const colors = {
        'gray': '#808080',
        black: '#000000',
        white: '#FFFFFF',
        red: '#FF0000',
        blue: '#0000FF',
        green: '#008000',
        yellow: '#FFFF00',
        orange: '#FFA500',
        purple: '#800080',
        // Add more color mappings as needed
    };
    const shapeColor = colors[data.shapeColor] || data.shapeColor; // Use shape color provided by user

    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                ${shape.getSVG(shapeColor, shapeX, shapeY)} <!-- Pass shape color and position -->
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${data.textColor}" font-size="30">${data.text}</text>
            </svg>`;
}




// Define function to save SVG to file
function saveSVG(svg) {
    fs.writeFile('./examples/logo.svg', svg, (err) => {
        if (err) {
            console.error('Error saving SVG file:', err);
        } else {
            console.log('Generated logo.svg');
        }
    });
}

// Main function to run the application
async function main() {
    try {
        const userInput = await promptUser();
        const svg = generateSVG(userInput);
        saveSVG(svg);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Call main function to start the application
main();
