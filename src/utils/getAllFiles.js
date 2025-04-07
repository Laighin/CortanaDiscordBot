const fs = require('fs');
const path = require('path');

/**
 * Fetch the path for all files or folders in a given directory
 * @param {*} directory 
 * @param {*} foldersOnly 
 * @returns 
 */
module.exports = ( directory, foldersOnly = false) => {
    let fileNames = [];

    // Read all items in the directory, including information about whether they are files or folders
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly) {
            // If foldersOnly is true, only add directories to the list
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            // If foldersOnly is false, only add files to the list
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
};