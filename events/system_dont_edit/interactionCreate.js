module.exports = async (client, interaction) => {
    if (!interaction.inGuild()) return;

    if (interaction.isCommand()) client.emit("useSlashCommand", (client, interaction));

    if (interaction.isButton()) client.emit("useButton", (client, interaction));
        
    if (interaction.isSelectMenu()) client.emit("useDropdown", (client, interaction));
};