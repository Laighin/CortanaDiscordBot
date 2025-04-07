/**
 * Log information to the console when the bot is ready.
 * Useful for debugging and confirming the bot is connected properly.
 * @param {*} client 
 */
module.exports = (client) => {
    console.log(`✅ ${client.user.tag} is online.`); // This will log the bot's Discord tag to confirm it's online.

    console.log("Currently active in the following servers:"); // List the servers the bot is currently a member of
    client.guilds.cache.forEach((guild) => {
        console.log(`- ${guild.name}`);
    });
};