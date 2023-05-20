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
		.setDescription("CodeSJ 봇 사용법"),

	async execute(interaction) {
		const helpEmbed = new EmbedBuilder().setColor("Random");
		helpEmbed
			.setTitle("CodeSJ 서비스 관리 봇 사용법")
			.setDescription(
				`1. **/service** 명령어로 메인메뉴를 호출합니다.\n2. **서비스 확인**, **서비스 재시작**, **서비스 중지** 중 원하는 기능을 클릭합니다.\n3. 원하는 서비스명을 클릭하여 서비스를 제어합니다.\n\n+ 시해븐위키 관련 : seaheaven.kr은 **apache2**, namu.seaheaven.kr은 **seaheaven** 서비스를 활용하시면 됩니다.`
			);
		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
