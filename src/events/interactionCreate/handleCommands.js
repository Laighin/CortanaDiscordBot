const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * Handles slash command interactions.
 * Lodas local command, checks for dev/test restrictions and verifies required permissions.
 * 
 * @param {*} client 
 * @param {*} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
    // Only process chat input (slash) commands
    if (!interaction.isChatInputCommand()) return;

    // Load local commands from the commands folder
    const localCommands = getLocalCommands();

    try {
        // Find the command object that matches the interaction command name
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) {
            const commandNotFoundResponses = [
                "Oops! I couldn't find that command. Did you spell it right?",
                "Command not found! Maybe it's a secret one?",
                "Sorry, but that command seems to be missing in action.",
                "I couldn't locate that command. Are you sure it exists?",
                "Command not found! Maybe it’s hiding?",
                "Looks like that command is lost in the void. Try another one!",
                "Whoops, I couldn’t find that command. Maybe you mistyped it? 🤔",
                "I don’t know that one! Maybe it's an ancient command? 🔮",
                "Command not found. Did you mean... literally anything else? 🕵️‍♀️",
                "I couldn’t find that command. Are you sure it’s real? 😆"
            ]
            return interaction.reply({
                content: commandNotFoundResponses[Math.floor(Math.random() * commandNotFoundResponses.length)]
            });
        }

        // Check if the command is developer-only
        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                const devOnlyResponses = [
                    "Whoa there, only developers can use this command! 😎",
                    "Sorry, this command is for the dev squad only. Not you!",
                    "Looks like you're not on the developer roster. Access denied! 📋",
                    "Developer-only command—sorry, you're not in the club!",
                ]
                interaction.reply({
                    content: devOnlyResponses[Math.floor(Math.random() * devOnlyResponses.length)],
                });
                return;
            }
        }

        // Check if a command is test-only and if it's being run in the test server
        if (commandObject.testOnly) {
            if (!interaction.guild.id === testServer) {
                const testOnlyResponses = [
                    "This command is only available in our test server. Try it there!",
                    "Oops! You’re trying to run a test command in the wrong place.",
                    "Heads up: this command is restricted to our testing environment, buddy. You're not in the lab!",
                    "Test commands live in our test server—this isn't the right stage!"
                  ];
                interaction.reply({
                    content: testOnlyResponses[Math.floor(Math.random() * devOnlyResponses.length)],
                });
                return;
            }
        }

        // Check if the user has the required permissions for the command
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    const insufficientUserPermResponses = [
                        "Uh oh, it looks like you don’t have the necessary permissions to do that. Try again when you're in charge!",
                        "Sorry, you need a higher level of clearance to run this command. Maybe next time!",
                        "Access denied: you lack the required permissions. Maybe talk to your admin?",
                        "It seems your permissions aren't up to scratch for this command, my friend."
                    ]
                    interaction.reply({
                        content: insufficientUserPermResponses[Math.floor(Math.random() * devOnlyResponses.length)],
                    });
                    break;
                }
            }
        }

        // Check if the bot has the required permissions to run the command
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    const insufficientBotPermResponses = [
                        "I can’t seem to do that—I'm missing some permissions. Mind checking my role?",
                        "Looks like I don't have the power to run that command, someone upgrade me! 🔧",
                        "I'm a bit underpowered here—I need more permissions to execute this command.",
                        "I don't have the necessary permissions. A role upgrade might be in order! 🔧",
                        "I can't do that right now. My permissions are a bit... lacking. 😕",
                        "Permissions? Who needs 'em? Oh wait, I do."
                    ]
                    interaction.reply({
                        content: insufficientBotPermResponses[Math.floor(Math.random() * devOnlyResponses.length)],
                    });
                    break;
                }
            }
        }

        // execute the command callback, passing the client and interaction as arguments
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`Cortana encountered an error running this command: ${error}`);
    }
};