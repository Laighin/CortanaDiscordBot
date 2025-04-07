module.exports = {
    /**
     * Sends a reply to the interaction with the ping time and websocket ping.
     * @param {*} client 
     * @param {*} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        // Calculate the ping time
        const ping = reply.createdTimestamp - interaction.createdTimestamp
        interaction.editReply(`Pong! ${ping}ms | Websocket: ${client.ws.ping}ms`);
    },

    name: 'ping',
    description: 'Pong!',
    //devOnly: Boolean,
    // testOnly: Boolean
    // options: Object[],
    // deleted: true
}