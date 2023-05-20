/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Events,
	EmbedBuilder,
	SlashCommandBuilder,
} = require("discord.js");

/**
 * @type {import('../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("restart")
		.setDescription("서비스를 재시작함."),

	async execute(interaction) {
		//console.log(interaction);
		console.log(
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
		);

		if (
			interaction.member.roles.cache.some((r) => r.id == "1074241811314389022")
		) {
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId("restartseaheaven")
						.setLabel("seaheaven")
						.setStyle(ButtonStyle.Danger)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("restartapache2")
						.setLabel("apache2")
						.setStyle(ButtonStyle.Danger)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("restartmtbot")
						.setLabel("mtbot")
						.setStyle(ButtonStyle.Danger)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId("restartcodesjbot")
						.setLabel("codesjbot")
						.setStyle(ButtonStyle.Danger)
				);
			await interaction.reply({
				content:
					"재시작할 서비스를 클릭하세요.\n버튼을 클릭할 시 바로 재시작됩니다.",
				ephemeral: true,
				components: [row],
			});
		} else {
			await interaction.reply({
				content: "권한이 없습니다. 관리자에게 문의하세요",
			});
		}
	},
};
