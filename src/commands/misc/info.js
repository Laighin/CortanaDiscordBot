const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { name, version } = require('../../../package.json');

module.exports = {
    /**
     * This command sends an info embed about the bot.
     * It includes the bot's name, version, avatar, author, and a description.
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        // Define the embed
        const avatar = interaction.client.user.displayAvatarURL();
        const embed = new EmbedBuilder()
        .setTitle(`Info - ${client.user.username}`)
        .setDescription("This card contains the information regarding Cortana.")
        .setColor(0x4cc2fc)
        .addFields({name: 'Name:', value: `${client.user.username}`, inline: true})
        .addFields({name: 'Version:', value: `${version}`, inline: true})
        .addFields({name: 'Author:', value: 'Laighin'})
        .setThumbnail(avatar)

        await interaction.editReply({ embeds: [embed] });

    },

    name: 'info',
    description: "Sends an info embed about Cortana!",
    //devOnly: Boolean,
    // testOnly: Boolean
    // options: Object[],
    // deleted: true
}