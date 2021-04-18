module.exports = responseData => {
    const { title, description, installation, usage, license, contribution, tests, github, email } = responseData



    return `
# ${ title}

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
${ installation }

## Usage
${ usage }

## License
${ license }

## Contribution
${ contribution }

## Tests
${ tests }

## Questions
To contact me with any further questions:
-[GitHub](https://github.com/${ github })
-[Email](mailto://${ email })
    `
}
