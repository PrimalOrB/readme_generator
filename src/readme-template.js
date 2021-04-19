// function to generate list with sub-items
const generateList = listItem => {
    // return map function
return `${listItem
    .map( ( { sublevel, item } ) => {
        // 2x spaces per sublevel
        const space = '  '
        // repeate spaces by sublevel value
       return `${ space.repeat( sublevel ) }* ${ item }
`} )
// join
.join( '' ) }`
}


module.exports = responseData => {
    const { title, description, installation, usage, license, contribution, tests, github, email } = responseData

    return `
# ${ title }

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
${ license }

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
