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
const functoit = {
	stgrade: "1",
	ndgrade: "2",
	rdgrade: "3",
};
module.exports = {
	id: "setclas",

	async execute(interaction) {
		let funcit = functoit[interaction.customId];

		if (
			interaction.member.roles.cache.some(
				(r) => r.id == "1074241811314389022"
			) ||
			funcit == "status"
		) {
			const { NodeSSH } = require("node-ssh");
			const ssh = new NodeSSH();
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it1`)
						.setLabel("1반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it2`)
						.setLabel("2반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it3`)
						.setLabel("3반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it4`)
						.setLabel("4반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it5`)
						.setLabel("5반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it6`)
						.setLabel("6반")
						.setStyle(ButtonStyle.Primary)
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`${funcit}it7`)
						.setLabel("7반")
						.setStyle(ButtonStyle.Primary)
				);

			await interaction.reply({
				content: `반을 선택하세요.`,
				ephemeral: true,
				components: [row],
			});
		} else {
			await interaction.reply({
				content: "권한이 없습니다. 관리자에게 요청하세요",
				ephemeral: true,
			});
		}

		return;
	},
};
