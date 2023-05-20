const Timetable = require("comcigan-parser");
const timetable = new Timetable();
let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let hour = today.getHours(); //시간
let min = today.getMinutes(); //분
let sec = today.getSeconds(); //초

const schoolFinder = (schoolName, region) => (schoolList) => {
	const targetSchool = schoolList.find((school) => {
		return school.region === region && school.name.includes(schoolName);
	});
	return targetSchool;
};
setInterval(function () {
	timetable
		.init()
		.then(() => timetable.search("명륜"))
		.then(schoolFinder("강릉명륜고등학교", "강원"))
		.then((school) => timetable.setSchool(school.code))
		.then(() => {
			Promise.all([timetable.getClassTime(), timetable.getTimetable()]).then(
				(res) => {
					//console.log(res[0]); // 시간표\
					let ban = "2";
					console.log(res[1][2][2][0][0].subject); // 수업시간정보
				}
			);
		});
}, 2000);
