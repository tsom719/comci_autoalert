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
		.setName("status")
		.setDescription("서버 상태를 확인함")
		.addStringOption((option) =>
			option.setName("service").setDescription("확인할 서비스명 입력")
		),

	execute(interaction) {
		let service = interaction.options.getString("service");
		let resultfinal;
		const helpEmbed = new EmbedBuilder().setColor("Random");
		const { NodeSSH } = require("node-ssh");
		const ssh = new NodeSSH();
		if (
			service == "seaheaven" ||
			service == "apache2" ||
			service == "mtbot" ||
			service == "codesjbot"
		) {
			//service = service.toLowerCase();

			ssh
				.connect({
					host: "dev.codesj.kr",
					username: "codesj",
					password: "a071907a",
					readyTimeout: 30000,
				})
				.then(function () {
					ssh
						.execCommand(
							"echo a071907a | sudo -S systemctl status " + service,
							{}
						)
						.then(function (result) {
							ssh.execCommand("a071907a", {});
							resultfinal = result.stdout;
						})
						.then(function () {
							if (resultfinal.startsWith("●")) {
								console.log(`CodeSJ BOT >>> ${service} Status Online ●`);
								helpEmbed
									.setTitle("서비스 작동 현황 - 온라인")
									.setDescription(resultfinal)
									.setColor(0x00ff00);
								interaction.reply({
									embeds: [helpEmbed],
								});
							} else if (resultfinal.startsWith("○")) {
								console.log(`CodeSJ BOT >>> ${service} Status Offline ○`);
								helpEmbed
									.setTitle("서비스 작동 현황 - 오프라인")
									.setDescription(resultfinal)
									.setColor(0xff0000);
								interaction.reply({
									embeds: [helpEmbed],
								});
							}
						});
				});
		} else {
			//service = service.toLowerCase();

			ssh
				.connect({
					host: "dev.codesj.kr",
					username: "codesj",
					password: "a071907a",
					readyTimeout: 30000,
				})
				.then(function () {
					ssh
						.execCommand("echo a071907a | sudo -S systemctl status apache2", {})
						.then(function (result) {
							ssh.execCommand("a071907a", {});
							console.log(result.stdout);
							resultfinal = result.stdout;
						})
						.then(function () {
							helpEmbed
								.setTitle("서비스 작동 현황 - 알 수 없는 서비스명")
								.setDescription(
									"서비스명이 없거나 잘못 입력되었습니다.\n\n조회 가능한 서비스는 다음과 같습니다\n```\nseaheaven\napache2\nmtbot\n```"
								)
								.setColor(0xff0000);
							interaction.reply({
								embeds: [helpEmbed],
							});
						});
				});
		}
	},
};
