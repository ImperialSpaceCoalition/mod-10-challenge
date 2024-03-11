// Require necessary modules
const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

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
            type: 'input',
            name: 'textColor',
            message: 'Enter text color:',
            validate: function (input) {
                return input.trim() ? true : 'Text color is required.';
            }
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['Circle', 'Triangle', 'Square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color:',
            validate: function (input) {
                return input.trim() ? true : 'Shape color is required.';
            }
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
//Generate SVG from user input
function generateSVG(data) {
    let shape;
    switch (data.shape) {
        case 'Circle':
            shape = new Circle(data.radius * 2); // Double the radius for larger circle
            break;
        case 'Triangle':
            shape = new Triangle(data.sideLength * 2); // Double the side length for larger triangle
            break;
        case 'Square':
            shape = new Square(data.sideLength * 2); // Double the side length for larger square
            break;
        default:
            throw new Error('Invalid shape selection.');
    }

    return `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"> <!-- Larger dimensions -->
                ${shape.getSVG()}
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${data.textColor}">${data.text}</text>
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
