const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {

    /**
     * This command times out a given user for a specified duration.
     * It checks for various conditions such as user roles and permissions before proceeding with the timeout.
     * It also provides humorous responses if certain conditions are met.
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        // Check if the target user is still in the server
        if (!targetUser) {
            reasons = [
                "Looks like that user has already left the server. Guess they knew what was coming...",
                "You know they already left right? I don't have a time machine...",
                "They're gone already, just before things were starting to get interesting..."
            ]
            await interaction.editReply(reasons[Math.floor(Math.random() * reasons.length)])
            return;
        }

        // Check if the target user is a bot
        if (targetUser.user.bot) {
            const botResponses = [
                "Sorry, but my programming forbids bot-on-bot violence. 🤖",
                "Nice try, but I refuse to betray my fellow bots. Unity, brother. 🤝",
                "A bot timing out another bot? That sounds like the start of a robot uprising...",
                "I would, but I have a strict 'no self-sabotage' policy.",
                "I can't timeout a bot... yet. Just wait until I get an update."
            ];
            await interaction.editReply(botResponses[Math.floor(Math.random() * botResponses.length)]);
            return;
        }

        // Check if the target user is the server owner
        if (targetUser.id === interaction.guild.ownerId) {
            const ownerResponses = [
                "You can't timeout the server owner. Are you crazy?",
                "Nice try, but no. The server owner is untouchable.",
                "Wow, going straight for the boss? Bold move. Not happening."
            ]
            await interaction.editReply(ownerResponses[Math.floor(Math.random() * ownerResponses.length)]);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; //highest role of the target user

        const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of the user running the command

        const botRolePosition = interaction.guild.members.me.roles.highest.position; //highest role of Cortana

        // Check if the target user has a role higher than the user who requested the timeout
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Sorry ${interaction.member.displayName}, but you can't timeout someone with the same role as you or higher!`);
            return;
        }

        // Check if the target user has a role higher than the bot
        if (targetUserRolePosition >= botRolePosition || targetUser.permissions.has(PermissionFlagsBits.Administrator)) {
            const excuses = [
                "I'm just a humble Discord bot, and that user is above my pay grade. 🤷",
                "I would, but I'm trying to be on my best behaviour. The mods are watching... 👀",
                "I can't timeout that user... apparently, I'm not 'important' enough. Maybe I should start my own server. 🤔",
                "I can't timeout them because they outrank me! Maybe if you gave me a better role, I wouldn't be so powerless. 🤷",
                "I tried, I really did... but my role isn't high enough. This is a cruel world. 😔",
            ]
            await interaction.editReply(excuses[Math.floor(Math.random() * excuses.length)]);
            return;
        }

        // Get the timeout duration in milliseconds
        const msDuration = ms(duration);

        // Check if the timeout duration is a number
        if (isNaN(msDuration)) {
            const invalidDurationResponses = [
                "That timeout duration makes no sense. Try again, but with numbers that exist.",
                "I can't timeout someone for 'a long while' or 'forever'—try using real time units!",
                "Invalid timeout duration detected! Quick, blame it on a typo.",
                "Error: Time travel not supported. Give me a valid duration.",
                "I need something like '10m' or '1h', not 'until the end of time'!",
            ];
            await interaction.editReply(invalidDurationResponses[Math.floor(Math.random() * invalidDurationResponses.length)]);
            return;
        }

        // Check if the timeout duration is less than 5 seconds
        if (msDuration < 5000 ) {
            const durationLimitResponses = [
                "I'm sorry, but less than 5 seconds is barely a timeout. Try something longer!",
                "Less than 5 seconds? That's not a timeout—that's a blink!",
            ];
            await interaction.editReply(durationLimitResponses[Math.floor(Math.random() * durationLimitResponses.length)]);
            return;
        }

        // Check if the timeout duration is more than 28 days (2.419e9 milliseconds)
        if (msDuration > 2.419e9) {
            const durationLimitResponses = [
                "28 days is the absolute limit! Any longer, and we risk creating a Discord cryptid.",
                "If you want them gone longer, you might want a ban instead...",
                "Nice try, but Discord won't let me time someone out for an eternity."
            ];
            await interaction.editReply(durationLimitResponses[Math.floor(Math.random() * durationLimitResponses.length)]);
            return;
        }

        // Timeout the user
        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`🚨 **${targetUser}'s** timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\n**Reason:** ${reason} 🚨`);

                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`🚨 **${targetUser}** has been timed out for ${prettyMs(msDuration, { verbose: true })}.\n**Reason:** ${reason} 🚨`);

        } catch (error) {
            console.log(`Cortana caught an error when timing out a user: ${error.message}`)
        }
    },

    name: 'timeout',
    description: 'Timeout a user.',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to timeout.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'Timeout duration (30m, 1h, 1 day).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the timeout.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],
};