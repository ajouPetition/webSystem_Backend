// 디비 설정
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'webproject.cyqjzjrrjapy.ap-northeast-1.rds.amazonaws.com',
	port: '3306',
	user: 'admin',
	password: '1q2w3e4r!',
	database: 'webservice'
});

conn.connect(err => {
	if (err) console.log("MySQL 연결 실패 : ", err);
	console.log("MySQL 연결 성공");
})

module.exports = conn;