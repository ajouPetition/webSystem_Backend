// 디비 설정
const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

conn.connect((err) => {
  if (err) console.log("MySQL 연결 실패 : ", err);
  console.log("MySQL 연결 성공");
});

module.exports = conn;
