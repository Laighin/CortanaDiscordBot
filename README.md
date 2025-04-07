# Cortana - Discord Bot

Cortana is a Discord bot that provides various server commands such as banning users and showing schedules all while delivering unique responses.

## Table of Contents
1. [ProjectOverview](#project-overview)
2. [InstallationInstructions](#installation-instructions)
3. [Usage](#usage)

## Project Overview
Cortana is a Discord bot designed to help server administrators with moderation tasks while providing a fun and engaging personality. She can ban, kick or timeout users and respond to commands with quirky and humerous messages.
I designed Cortana as a way to practice my JavaScript skills and learn more about Node.js and Discord.js.

## Installation Instructions
1. Clone the repository
```bash
git clone https://github.com/Laighin/CortanaDiscordBot
```
2. Navigate to the project folder
```bash
cd project-name
```
3. Install dependencies
```bash
npm install
```
4. Create a .env file and add your environment variables (e.g. bot token, test server ID, user IDs etc)
5. To run the bot locally:
```bash
npm start
```

## Usage
1. Kick
```
/kick <user> <reason> (optional)
```
Kicks a user from the server. The `<reason>` is optional, but recommended for clarity.
2. Timeout
```
/timeout <user> <duration> <reason> (optional)
```
Times out (mutes) a user for a specific `<duration>`.
3. Ban
```
/ban <user> <reason> (optional)
```
Bans a user.
4. Info
```
/info
```
Provides info on the bot.
5. Ping
```
/ping
```
Provides the current ping.
6. Schedule (Requires work)
```
/schedule
```
The schedule command is currently more of a template for you to fill in with whatever info you'd like the command to return.