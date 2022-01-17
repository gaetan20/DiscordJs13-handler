const { readdirSync } = require("fs");
const chalk = require("chalk");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const loadCommands = (client, dir = "./commands") => {
	const commandFiles = readdirSync(dir).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		client.commands.set(command.data.name, command);

		console.log(chalk.white(
			chalk.green.bgGreen(" ") +
			' commande ' +
			chalk.green.bold(command.data.name)
		));

	}


	const commands = [];
	const commandFileArray = readdirSync(dir).filter(file => file.endsWith('.js'));

	for (const file of commandFileArray) {
		const command = require(`../commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '9' }).setToken(client.config.TOKEN);

	(async () => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(client.config.CLIENTID, client.config.GUILDID),
				{ body: commands },
			);

			console.log(chalk.white(
				chalk.red.bgRed(" ") +
				' Les slash commands ont été actualisées '
			));
		} catch (error) {
			console.error(error);
		}
	})();
};

const loadEvents = (client, dir = "./events") => {
	readdirSync(dir).forEach(dirs => {
		const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

		for (const event of events) {
			const evt = require(`../${dir}/${dirs}/${event}`);
			const evtName = event.split(".")[0];
			client.on(evtName, evt.bind(null, client));
			console.log(chalk.white(
				chalk.yellow.bgYellow(" ") +
				' événement ' +
				chalk.yellow.bold(evtName)
			));
		};
	});
};

module.exports = {
	loadCommands,
	loadEvents,
}