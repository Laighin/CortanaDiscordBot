const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

/**
 * Loads and registers event handlers from the /events directory.
 * For each subfolder, it assumes the folder name matches the event name.
 * Then, it loads all files in that  folder and sorts them and registers an event listener
 * that calls all the functions in each file when that event is emitted.
 * @param {*} client 
 */
module.exports = (client) => {
    // Get a list of all subdirectories in the events folder (each representing an event category)
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        // For each event folder, get all files (which are assumed to be event handlers)
        const eventFiles = getAllFiles(eventFolder);
        // Sort the files (this ensures a load order)
        eventFiles.sort((a, b) => a > b);
        console.log(eventFiles);

        // Extract the event name from folder path
        // Replace any backslashes with forward slashes
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        

        // Register an event listener for the event name
        client.on(eventName, async (arg) => {
            // For every file in the event folder, import the event function and execute it
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                // Pass the client and the event argument to the event function
                await eventFunction(client, arg);
            }
        });
    }
};