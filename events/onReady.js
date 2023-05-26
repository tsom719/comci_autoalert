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
		let gonow = 0;

		let sendnow = (clls) => {
			let today = new Date();
			let day = today.getDay(); // 요일
			let uscheck = "SELECT * FROM user_account"; //구독자 확인
			function callmql(err, rows, fields) {
				if (err) throw err;
				else {
					for (var i = 0; i < rows.length; i++) {
						parsenow(2, 2, day - 1, clls).then(async (result) => {
							let user = client.users.cache.get(rows[i].discord_id);
							user.send(`다음 시간은 ${result}입니다.`);
							console.log(
								`아이디 ${rows[i].discord_id}에게 시간 안내 >> ${result}`
							);
						});
					}
				}
			}
			mql.query(uscheck, callmql);
			gonow = 1;
		};
		console.log(`Ready! Logged in as ${client.user.tag}`);
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
