const { testServer } = require('../../../config.json'); // This is the test server ID, use this to test commands before deploying them globally.
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * Registers or updates slash commands on Discord when the bot is ready.
 * Compares the locally defined commands with those already registered on Discord.
 * If a command is marked as deleted, it will be removed.
 * This is the first event file that will be executed when the bot is ready.
 * @param {*} client 
 */
module.exports = async (client) => {
    try {
        // Fetch the local commands from the commands directory
        const localCommands = getLocalCommands();

        // Fetch the application commands
        const applicationCommands = await getApplicationCommands(client); // Pass in the test server ID here as a second parameter to test commands before deploying them globally.

        // Loop through each local command
        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            // Check if the command already exists on Discord
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            // If the command exists, check if it needs to be updated or deleted
            if (existingCommand) {
                // If the command is marked as deleted locally, remove it from Discord
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🗑️ Deleted command: ${name}`);
                    continue;
                }

                // If the command exists and is not marked for deletion, check if it needs to be updated
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`📝 Updated command: ${name}`);
                }

                console.log(`👍 Finished checking command: ${name}`)
            } else {
                // If the command is not found on Discord and is marked for deletion locally, skip it
                if (localCommand.deleted) {
                    console.log(`⏩ Skipping registering command "${name}" as it's set to delete.`);
                    continue;
                }
                
                // If the command doesn't exist on Discord and isn't marked for deletion, create it
                await applicationCommands.create({
                        name,
                        description,
                        options,
                });
                
                console.log(`✨ Registered command: ${name}`);
            }
        }
    } catch (error) {
        console.log(`Cortana caught an error while registering commands: ${error}`);
    }
};