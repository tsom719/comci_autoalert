const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId);
		if (
			interaction.customId.startsWith("1") ||
			interaction.customId.startsWith("2") ||
			interaction.customId.startsWith("3")
		) {
			try {
				await client.buttonCommands.get("adddb").execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that button!",
					ephemeral: true,
				});
				return;
			}
		} else if (
			interaction.customId.startsWith("stgrade") ||
			interaction.customId.startsWith("ndgrade") ||
			interaction.customId.startsWith("rdgrade")
		) {
			try {
				await client.buttonCommands.get("setclas").execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that button!",
					ephemeral: true,
				});
				return;
			}
		} else {
			if (!command) {
				await require("../messages/defaultButtonError").execute(interaction);
				return;
			}
			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that button!",
					ephemeral: true,
				});
				return;
			}
		}
	},
};
