const settings = require("../../../config.json");
var mysql = require("mysql");
var mql = mysql.createPool({
	host: settings.mqlhost,
	user: settings.mqlid,
	password: settings.mqlpass,
	port: settings.mqlport,
	database: settings.mqlbase,
});

const { EmbedBuilder } = require("discord.js");
module.exports = {
	id: "adddb",

	async execute(interaction) {
		let grade = "";
		let clas = interaction.customId.split("it").slice(1).join("it");
		console.log(interaction.customId);

		if (interaction.customId.startsWith("1")) {
			grade = `1`;
		} else if (interaction.customId.startsWith("2")) {
			grade = `2`;
		} else if (interaction.customId.startsWith("3")) {
			grade = `3`;
		}
		let userid = interaction.user.id;
		function callback(err, rows, fields) {
			if (err) {
				throw err;
			}
		}
		var params = [userid, grade, clas];
		mql.query(
			"INSERT INTO subs_list (discord_id,grade,clas) VALUES (?,?,?)",
			params,
			callback
		);

		await interaction.reply({
			content: `등록이 완료되었습니다.\n ${userid} | ${grade}학년 | ${clas}반`,
			ephemeral: true,
			components: [],
		});

		return;
	},
};
