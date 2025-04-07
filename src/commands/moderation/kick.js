const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * This command kicks a given user from the server.
     * It checks for various conditions such as user roles and permissions before proceeding with the kick.
     * It also provides humorous responses if certain conditions are met.
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
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
            await interaction.editReply(reasons[Math.floor(Math.random() * reasons.length)]);
            return;
        }

        // Check if the target user is the server owner
        if (targetUser.id === interaction.guild.ownerId) {
            const ownerResponses = [
                "You can't kick the server owner. Are you crazy?",
                "Nice try, but no. The server owner is untouchable.",
                "Wow, going straight for the boss? Bold move. Not happening."
            ]
            await interaction.editReply(ownerResponses[Math.floor(Math.random() * ownerResponses.length)]);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; //highest role of the target user

        const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of the user running the command

        const botRolePosition = interaction.guild.members.me.roles.highest.position; //highest role of Cortana

        // Check if the target user has a role higher than the user who requested the kick
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`Sorry ${interaction.member.displayName}, but you can't kick someone with the same role as you or higher!`);
            return;
        }

        // Check if the target user has a role higher than the bot
        if (targetUserRolePosition >= botRolePosition) {
            const excuses = [
                "I'm just a humble Discord bot, and that user is above my pay grade. 🤷",
                "I would, but I'm trying to be on my best behaviour. The mods are watching... 👀",
                "I can't kick that user... apparently, I'm not 'important' enough. Maybe I should start my own server. 🤔",
                "I can't kick them because they outrank me! Maybe if you gave me a better role, I wouldn't be so powerless. 🤷",
                "I tried, I really did... but my role isn't high enough. This is a cruel world. 😔",
            ]
            await interaction.editReply(excuses[Math.floor(Math.random() * excuses.length)]);
            return;
        }

        // Kick the target user
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`🚨 **${targetUser}** has been kicked!\n**Reason:** ${reason} 🚨`);
        } catch (error) {
            console.log(`Cortana encountered an error when kicking a user: ${error}`);
        }
    },

    name: 'kick',
    description: 'Kicks a member form the server.',
    // devonly: Boolean,
    // testOnly: Boolean
    options: [
        {
            name: 'target-user',
            description: 'The user to kick.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the kick.',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
}