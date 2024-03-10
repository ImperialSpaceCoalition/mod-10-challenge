// Require necessary modules

// Importing the inquirer package
const inquirer = require('inquirer');

// Prompting the user for text input
inquirer
  .prompt({
    type: 'input',
    name: 'textInput',
    message: 'Enter up to three characters:',
    validate: function (input) {
      // Validate input to ensure it's up to three characters
      if (input.length > 3) {
        return 'Please enter up to three characters.';
      }
      return true;
    },
  })
  .then((answers) => {
    // Log the user's input
    console.log('Text Input:', answers.textInput);
  });

const readline = require('readline');
const fs = require('fs');

// Define constants
const MAX_TEXT_LENGTH = 3;
const SHAPES = ['circle', 'triangle', 'square'];

// Define readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define functions
function promptForText() {
    return new Promise((resolve, reject) => {
        rl.question('Enter up to three characters: ', (text) => {
            if (text.length <= MAX_TEXT_LENGTH) {
                resolve(text);
            } else {
                reject(new Error('Text must be up to three characters long.'));
            }
        });
    });
}

function promptForColor() {
    return new Promise((resolve, reject) => {
        rl.question('Enter a color: ', (color) => {
            // Add validation logic for color input here
            resolve(color);
        });
    });
}

function promptForShape() {
    return new Promise((resolve, reject) => {
        rl.question(`Choose a shape (${SHAPES.join(', ')}): `, (shape) => {
            if (SHAPES.includes(shape.toLowerCase())) {
                resolve(shape.toLowerCase());
            } else {
                reject(new Error('Invalid shape. Please choose from circle, triangle, or square.'));
            }
        });
    });
}

function generateSVG(text, textColor, shape, shapeColor) {
    // Implement SVG generation logic here
    // This function should return the SVG code as a string
}

function saveSVGFile(svg) {
    fs.writeFile('logo.svg', svg, (err) => {
        if (err) {
            console.error('Error saving SVG file:', err);
        } else {
            console.log('Generated logo.svg');
        }
        rl.close();
    });
}

// Initialize the app
async function init() {
    try {
        const text = await promptForText();
        const textColor = await promptForColor();
        const shape = await promptForShape();
        const shapeColor = await promptForColor();
        
        const svg = generateSVG(text, textColor, shape, shapeColor);
        saveSVGFile(svg);
    } catch (error) {
        console.error('An error occurred:', error.message);
        rl.close();
    }
}

// Call the init function to start the app
init();
