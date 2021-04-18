    // add file system package
const fs = require('fs');

    // export function to save file
module.exports = fileData => {
    return new Promise( ( resolve, reject ) => {
        fs.writeFile( './README.md', fileData, err => {
            if( err ) {
                reject( err )
                return
            }
            resolve( {
                ok: true,
                message: 'Readme created!"'
            });
        });
    });
};