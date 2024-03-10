// Require necessary modules
const inquirer = require('inquirer');
const fs = require('fs');

// Define function to prompt user for input
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters:',
            validate: function (input) {
                // Validate input to ensure it's up to three characters
                if (input.length > 3) {
                    return 'Please enter up to three characters.';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color:',
            default: 'black' // Default to black color if user doesn't provide one
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
            default: 'white' // Default to white color if user doesn't provide one
        }
    ]);
}

// Define function to generate SVG based on user input
function generateSVG(data) {
    let shape;
    switch (data.shape) {
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Square':
            shape = new Square();
            break;
        default:
            throw new Error('Invalid shape selection.');
    }

    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
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
