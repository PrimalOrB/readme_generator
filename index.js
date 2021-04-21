    // load inquirer
const inquirer = require( 'inquirer' );
    // licenses reference file
const licenseArr = require( './src/licenses.js' );
    // load generate readme module
const generateReadme = require( './src/readme-template.js' );
    // save file
const saveReadme = require( './utils/generate-readme.js' );
    // create list of license names for use in the prompts  
const licenseList = licenseArr.map( item => {
    return item.name
})


    // prompts for single entry data ( not lists )
const promptInput = () => {
        // inquirer prompts
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter title of your application ( * required )',
            validate: input => { // validate that an input has been entered
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
            message: 'Enter a description of your application ( * required )',
            validate: input => { // validate that an input has been entered
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
            name: 'github',
            message: 'Enter your GitHub username ( * required  )',
            validate: input => { // validate that an input has been entered
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
            message: 'Enter your email address ( * required  )',
            validate: input => { // validate that an input has been entered
                if( input ) {
                    return true
                } else {
                    console.log( 'Enter your email address!' )
                    return false
                }
            }
        },
        { 
            type: 'checkbox',
            name: 'license',
            message: 'Select a license for your application ( * required = 1 )',
            choices: licenseList, // list generated from licenses.js
            validate: input => {
                if( input.length === 1 ) { // check for length of 1 to validate single selection
                    return true
                } else {
                    console.log( 'Select a license!' )
                    return false
                }
            }
        }
    ]).then( data => {
        return data
    })
};

    // prompts to build list with custom levels ( number of indents for list sub-items )
const promptList = ( type, data ) => {
    // if data obj does not yet exist, instantiate
    if( !data ) {
        data = {}
    }

    // if installation instructions arr does not yet exist, instantiate
    if ( !data[`${type}`] ) {
        data[`${type}`] = []
            // add heading when starting new arr
        console.log(`
=================
${type} setup`)
    }
        // add heading when adding new sub obj
    console.log(`
Add new ${type} instruction / sub-instruction
=================
  `)
        // run inquirer prompts for new list items
    return inquirer.prompt([
        { // ask for list sub-level
            type: 'input', // changed from "number" to "input" type, as validation would block progress if invalid characters typed in
            name: 'sublevel',
            message: 'Enter list sub-level ( 1 - 4 )',
            default: 1,
            validate: input => {
                if( !input === NaN || input >= 1 && input <= 4 ) {
                    return true
                } else {
                    console.log( 'Enter list sub-level value between 1-4!' )
                    return false
                }
            }
        },
        { // ask for list item
            type: 'input',
            name: `item`,
            message: `Enter ${type} instructions for your application ( * required )`,
            validate: input => {
                if( input ) {
                    return true
                } else {
                    console.log( `Enter ${type} instructions!` )
                    return false
                }
            }
        },
        { // confirm if user wants to add another entry
          type: 'confirm',
          name: 'confirmAdd',
          message: `Would you like to enter another ${type} instruction?`,
          default: false
        }
      ]).then( inputs => {
        data[`${type}`].push( inputs ); // push inputs into data property
        if ( inputs.confirmAdd ) { // if adding another entry
            return promptList( type, data ); // call function again with current type and existing data
        } else {
            return data; // end function and return all data
        }
    });
};



// initialize prompts
promptInput()
.then( data => { 
    return promptList( `installation`, data ) // recursive installation list builder
})
.then( data => { 
    return promptList( `usage`, data ) // recursive usage list builder
})
.then( data => { 
    return promptList( `contribution`, data ) // recursive contribution list builder
})
.then( data => { 
    return promptList( `tests`, data ) // recursive tests list builder
})
.then( data => { // collect form data
    return generateReadme( data ) // send to generate readme content
})
.then( file => {
    return saveReadme( file ) // save readme file
})
.then( message => {
    console.log( message ) // return success message
})
.catch( err => {
    console.log( err ) // return any errors
})