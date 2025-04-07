const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    /**
     * An example command for sending an embed with a stream schedule.
     * This could be repurposed for any kind of schedule or event.
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        // Define the schedule
        const schedule = [
            { day: "Friday", time: "9:00 PM BST"},
            { day: "Saturday", time: "9:00 PM BST"},
        ];

        const embed = new EmbedBuilder()
            .setColor(0x4cc2fc)
            .setTitle("🎥 Stream Schedule")
            .setDescription("Catch the streams live every week!")
            .setThumbnail("https://example.com/thumbnail.png") // Replace with your own thumbnail URL
            .setTimestamp();

        schedule.forEach((stream) => {
            embed.addFields({ name: stream.day, value: `⏰ ${stream.time}`});
        });

        embed.addFields({ name: "📺 Watch Here", value: "PLACEHOLDER LINK"}); // Put your own link here

        embed.setFooter({ text: "Stay tuned for updates! 🔔"});

        await interaction.editReply({ embeds: [embed] });

    },

    name: 'schedule',
    description: "Sends a schedule!",
    //devOnly: Boolean,
    // testOnly: Boolean
    // options: Object[],
    // deleted: true
}