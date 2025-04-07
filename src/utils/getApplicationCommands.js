
/**
 * Fetches application commands for a specific server, or globally if no guild ID is provided.
 * @param {*} client 
 * @param {*} guildId 
 * @returns 
 */
module.exports = async (client, guildId) => {
    let applicationCommands;

    if (guildId) {
        // Fetch the specific server and get its command manager
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        // Use the global application commands
        applicationCommands = await client.application.commands;
    }

    // Ensure commands are fully fetched
    await applicationCommands.fetch();
    return applicationCommands;
}