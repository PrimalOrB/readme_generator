    // licenses reference file
const licenseArr = require( './licenses.js' );

const licenseGen = (arr, license) => {
        // filtered license obj
    const licenseObj = arr.filter( item => item.name == license)
    return licenseObj
};


// function to generate list with sub-items
const generateList = listItem => {
    // return map function
return `${listItem
    .map( ( { sublevel, item } ) => {
        // 2x spaces per sublevel
        const space = '  ';
        // repeate spaces by sublevel value
       return `${ space.repeat( sublevel ) }* ${ item }
`} )
// join
.join( '' ) }`
};


module.exports = responseData => {
    // descructure the responses data
    const { title, description, installation, usage, license, contribution, tests, github, email } = responseData
    // return statement, with generated lists included
    const licenseObj = licenseGen( licenseArr, license )

    return `
# ${ title }
[![License: ${licenseObj[0].tag}](${licenseObj[0].badge})](${licenseObj[0].url})

## Description 
${ description }

## Table Of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${ generateList( installation ) }
## Usage
${ generateList( usage )  }
## License
This application is covered under the [${ licenseObj[0].name }](${licenseObj[0].url}) license.

## Contribution
${ generateList( contribution )  }
## Tests
${ generateList( tests )  }

## Questions
Please feel free to contact me regarding any further questions:
* [GitHub Profile](https://github.com/${ github })
* [Email Me](mailto://${ email })
`
}
