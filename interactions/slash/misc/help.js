/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("강릉명륜고등학교 시간표 알리미 사용법"),

	async execute(interaction) {
		const helpEmbed = new EmbedBuilder().setColor("red");
		helpEmbed
			.setTitle("강릉명륜고등학교 시간표 알리미 사용법")
			.setDescription(
				`1. **/addalert** 명령어로 시간표 알리미에 등록합니다.\n 수업 시작 5분 전에 디스코드 개인 메세지로 알림이 갑니다.\n시간표 알리미 디스코드 서버에서 나가면 알림이 오지 않을 수 있습니다.`
			);
		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
