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
const settings = require("../../../config.json");
var mysql = require("mysql");
var mql = mysql.createPool({
	host: settings.mqlhost,
	user: settings.mqlid,
	password: settings.mqlpass,
	port: settings.mqlport,
	database: settings.mqlbase,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addalert")
		.setDescription("시간표 알리미 구독 추가하기"),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("stgrade")
					.setLabel("1학년")
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("ndgrade")
					.setLabel("2학년")
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("rdgrade")
					.setLabel("3학년")
					.setStyle(ButtonStyle.Primary)
			);
		await interaction.reply({
			content: "학년을 선택하세요.",
			ephemeral: true,
			components: [row],
		});
	},
};
