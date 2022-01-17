const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const loadPerms = require("./util/updatePerms");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS] });

client.config = require('./config');
client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN).then(() => {
    loadPerms.run(client);
})