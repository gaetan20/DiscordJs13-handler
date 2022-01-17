const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.run = async (client, interaction) => {
	
};

module.exports.data = new SlashCommandBuilder() // Classic SlashCommandBuilder with all options availables
	// Example of what can be done
	.setName('command')
	.setDescription('Command Description')
	.addStringOption(option => option.setName("option").setDescription("The description of the option").setRequired(true))
	.setDefaultPermission(false) // Put this to enable the permission filter

// Setup the permission filter
module.exports.perms = ["849368264965750814"]; // authorized roles or users