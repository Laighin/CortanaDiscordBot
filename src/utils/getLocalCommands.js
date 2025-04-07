// Import required modules
const path = require('path');
const getAllFiles = require('./getAllFiles');


module.exports = (exceptions = []) => {
    let localCommands = [];

    // Get the paths to all subdirectories (different categories of commands, e.g. moderation, misc, etc.)
    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (const commandCategory of commandCategories) {
        // Get all command files in the current category
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            // Require the command file
            const commandObject = require(commandFile);

            // Skip any exceptions
            if (exceptions.includes(commandObject.name)) {
                continue;
            }

            //Add the command to the list
            localCommands.push(commandObject);
        }
    }

    return localCommands;
}