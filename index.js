    // load inquirer
const inquirer = require( 'inquirer' );
    // load generate readme module
const generateReadme = require( './src/readme-template.js' );
    // save file
const saveReadme = require( './utils/generate-readme.js' );

const promptInput = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter title of your application',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter title!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'description',
            message: 'Enter a description of your application',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter a description!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions for your application',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter installation instructions!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'usage',
            message: 'Enter instructions for use of your application',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter usage directions!' )
                    return false
                }
            }
        },
        { 
            type: 'checkbox',
            name: 'license',
            message: 'Select a license for your application',
            choices: ['MIT', 'GNU GPLv3', 'Apache License 2.0', 'ISC', 'None'],
            validate: input => {
                if( input.length ) { //check for length to validate
                    return true
                } else {
                    console.log( 'Select a license!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'contribution',
            message: 'Enter contribution guidelines for other developers',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter contribution guidelines!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'tests',
            message: 'Enter test instructions for your application',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter test instructions!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter your GitHub username!' )
                    return false
                }
            }
        },
        { 
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter your email address!' )
                    return false
                }
            }
        }
    ]).then( data => {
        return data
    })
}

// initialize prompts
promptInput()
.then( data => { // collect form data
    return generateReadme( data ) // send to generate readme
})
.then( file => {
    return saveReadme( file )
})
.then( message => {
    console.log( message )
})
.catch( err => {
    console.log( err )
})