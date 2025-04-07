require('dotenv').config(); // Load environment variables from .env file
const { Client, IntentsBitField, ActivityType, EmbedBuilder} = require('discord.js'); // Import necessary classes and functions from discord.js
const eventHandler = require('./handlers/eventHandler'); // Import the event handler (this is where all the events are registered)

// Create a new Discord client instance with the necessary intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, // For basic server-related events
        IntentsBitField.Flags.GuildMembers, // To track member join/eave events
        IntentsBitField.Flags.GuildMessages, // For handling messages in servers
        IntentsBitField.Flags.MessageContent, // To read the content of messages
    ],
})


eventHandler(client); // Register all event listeners with the client using the event handler

client.login(process.env.TOKEN); // Log into Discord using the bot token from the environment variables