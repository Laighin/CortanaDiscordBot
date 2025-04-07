/**
 * This is an example file of how you could implement hidden easter eggs with the bot
 * @param {*} client 
 * @param {*} message 
 * @returns 
 */
module.exports = (client, message) => {
    if (message.author.bot) return;

    const specificUserId = "0000000000000000"; // Replace with the specific user's ID
    const triggerPhrase = "SAMPLE PHRASE"; // Replace with a specific phrase

    // Check if the message is from the specific user and contains the trigger phrase
    if (message.author.id === specificUserId && message.content.toLowerCase().includes(phrase)) {
        message.reply("Congratulations! You've triggered the Easter egg!");
    }
}