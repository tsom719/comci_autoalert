const Timetable = require("comcigan-parser");
const { findOneChild } = require("domutils");
const { listenerCount } = require("process");
const timetable = new Timetable();
const schoolFinder = (schoolName, region) => (schoolList) => {
	const targetSchool = schoolList.find((school) => {
		return school.region === region && school.name.includes(schoolName);
	});
	return targetSchool;
};
process.env.timeZone = "Asia/Seoul";
const neis = require("neis");
var mysql = require("mysql");
var settings = require("../config.json");
var mql = mysql.createPool({
	host: settings.mqlhost,
	user: settings.mqlid,
	password: settings.mqlpass,
	port: settings.mqlport,
	database: settings.mqlbase,
});

//let gr, ban, day, clls;

function parsenow(gr, ban, day, clls) {
	return new Promise((resolve, reject) => {
		timetable
			.init()
			.then(() => timetable.search("명륜"))
			.then(schoolFinder("강릉명륜고등학교", "강원"))
			.then((school) => timetable.setSchool(school.code))
			.then(() => {
				return Promise.all([
					timetable.getClassTime(),
					timetable.getTimetable(),
				]);
			})
			.then((res) => {
				const result = res[1][gr][ban][day][clls].subject; // 수업시간정보
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		let today = new Date();
		let day = today.getDay(); // 요일
		let uscheck = "SELECT * FROM subs_list"; //구독자 확인
		async function callmql(err, rows, fields) {
			if (err) throw err;
			else {
				for (var i = 0; i < rows.length; i++) {
					let id = rows[i].discord_id;
					parsenow(2, 2, 3 - 1, 2).then(async (result) => {
						let user = await client.users.fetch(id);
						console.log(id);
						user.send(`다음 시간은 ${result}입니다.`);
						console.log(`아이디 ${id}에게 시간 안내 >> ${result}`);
					});
				}
			}
		}
		mql.query(uscheck, callmql);
		let sendnow = (clls) => {
			let today = new Date();
			let day = today.getDay(); // 요일
			let uscheck = "SELECT * FROM subs_list"; //구독자 확인
			async function callmql(err, rows, fields) {
				if (err) throw err;
				else {
					for (var i = 0; i < rows.length; i++) {
						let id = rows[i].discord_id;
						parsenow(2, 2, day - 1, clls).then(async (result) => {
							let user = await client.users.fetch(id);
							console.log(id);
							user.send(`다음 시간은 ${result}입니다.`);
							console.log(`아이디 ${id}에게 시간 안내 >> ${result}`);
						});
					}
				}
			}
			mql.query(uscheck, callmql);
			gonow = 1;
		};
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const school = neis.createSchool(
			neis.REGION.GANGWON,
			"K100000356",
			neis.TYPE.HIGH
		);
		school.getMeal(2023, 5).then((d) => {
			console.log(
				"1일 급식 : " +
					"\n" +
					"조식 : " +
					d[20].breakfast +
					"\n" +
					"중식 : " +
					d[23].lunch +
					"\n" +
					"석식 : " +
					d[1].dinner +
					"\n"
			);
		});
		setInterval(function () {
			let today = new Date();
			let date = today.getDate(); // 날짜
			let day = today.getDay(); // 요일
			let hour = today.getHours(); //시간
			let min = today.getMinutes(); //분
			if (day < 6 && day != 0) {
				if (hour == 8 && min == 35) {
					if (gonow != 1) sendnow(0);
				} else if (hour == 9 && min == 45) {
					if (gonow != 1) sendnow(1);
				} else if (hour == 10 && min == 45) {
					if (gonow != 1) sendnow(2);
				} else if (hour == 11 && min == 45) {
					if (gonow != 1) sendnow(3);
				} else if (hour == 13 && min == 35) {
					if (gonow != 1) sendnow(4);
				} else if (hour == 14 && min == 35) {
					if (gonow != 1) sendnow(5);
				} else if (hour == 15 && min == 35 && day != 3 && day != 5) {
					if (gonow != 1) sendnow(6);
				} else gonow = 0;
			}
			console.log(date, day, hour, min, gonow);
		}, 2000);
	},
};
