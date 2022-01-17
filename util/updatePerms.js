const { readdirSync } = require("fs");

// File which edit the perm of each slash command

module.exports.run = async (client, dir = "./commands") => {

	const commandFileArray = readdirSync(dir).filter(file => file.endsWith('.js'));

    if (!client.application?.owner) await client.application?.fetch();

    const fullPermissions = []

    const guild = await client.guilds.fetch(client.config.GUILDID);
    const slashCommands = await guild.commands.fetch();

    for (const file of commandFileArray) {
        const command = require(`../commands/${file}`);
        if (command.perms) {

            const commandID = slashCommands.find(cmd => cmd.name == command.data.name).id

            const permissions = {
                id: commandID,
                permissions: []
            };

            for (const perm of command.perms) {
                if (guild.roles.cache.get(perm)) {
                    permissions.permissions.push({
                        id: perm,
                        type: "ROLE",
                        permission: true
                    });
                };

                if (guild.members.cache.get(perm)) {
                    permissions.permissions.push({
                        id: perm,
                        type: "USER",
                        permission: true
                    });
                };
            };

            fullPermissions.push(permissions);
        };
    }

    await guild?.commands.permissions.set({ fullPermissions });
};