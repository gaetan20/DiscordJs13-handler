const Discord = require('discord.js');

module.exports = async (client, interaction) => {

	// Don't edit this file, it link the executed slash command to the correct file

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.run(client, interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There were an error with the command !', ephemeral: true });
	}
};