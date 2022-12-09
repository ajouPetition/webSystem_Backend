const jwt = require("jsonwebtoken");
const conn = require("../config/db");
require("dotenv").config();

// 유저 모델 선언
let users = function (item) {
  this.userID = item.userID;
  this.username = item.username;
  this.password = item.password;
};

// 로그인과 토큰 생성
users.login = function (info, result) {
  data = [info.username, info.password];
  let sql = "SELECT * FROM users WHERE username = ? and password = ?";
  conn.query(sql, data, (err, row, fields) => {
    console.log("Error:", err);
    if (err) result(err, null);
    else if (row.length != 1) result(null, { status: "failed" });
    else {
      console.log("데이터: ", row);
      // result(null,{'status':'success','username':row[0].username})
      const key = process.env.SECRETE_KEY;
      let token = "";

      // jwt.sign(payload, secretOrPrivateKey, [options, callback])
      token = jwt.sign(
        {
          type: "JWT",
          username: row[0].username,
        },
        `${key}`,
        {
          expiresIn: "60m", // 60분후 만료
          issuer: "토큰발급자",
        }
      );
      // response
      return result(null, {
        status: "success",
        message: "token is created",
        token: token,
      });
    }
  });
};

// 조회
users.findByID = function (name, result) {
  let sql = `SELECT * 
              FROM users 
              WHERE userID IN (SELECT userID 
                                FROM users 
                                WHERE username = "${name}"`;
  conn.query(sql, (err, row, fields) => {
    console.log("Error:", err);
    if (err) return result(err, null);
    console.log("데이터: ", row);
    return result(null, row);
  });
};

// 유저 생성
users.create = function (newUser, result) {
  let data = [newUser.userID, newUser.username, newUser.password];
  console.log(data);
  sql = "INSERT INTO users(userID, username, password) VALUES(?, ?, ?)";
  conn.query(sql, data, (err, row, fields) => {
    // console.log("Error:", err);
    if (err) {
      console.log("error 발생");
      return result(err, null);
    }

    console.log(row);
    return result(null, { status: "success" });
  });
};

// 유저 정보 수정
users.update = function (user, result) {
  let data = [user.password, user.userID];
  sql = `UPDATE users 
          SET password = ? 
          WHERE userID IN (SELECT userID 
                            FROM users 
                            WHERE username = "${name}"`;
  conn.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
    if (err) return result(err, null);
    console.log("변화한 데이터 수: ", row.affectedRows);
    return result(null, { status: "success" });
  });
};

// 유저 데이터 삭제
users.delete = function (id, result) {
  let sql1 = `DELETE FROM comments WHERE userID = ${id}; `;
  let sql2 = `DELETE FROM agree WHERE userID = ${id}; `;
  let sql3 = `DELETE FROM board WHERE userID = ${id}; `;
  let sql4 = `DELETE FROM users WHERE userID = ${id}; `;
  conn.query(sql1, (err, row, fields) => {
    conn.query(sql2, (err, row) => {
      conn.query(sql3, (err, row) => {
        conn.query(sql4, (err, row) => {
          console.log("error: ", err);
          if (err) return result(err, null);
          console.log("삭제된 데이터 수: ", row.affectedRows);

          return result(null, { status: "success" });
        })
      })
    })
  });
};

// 유저 동의 데이터
users.agreePosts = function (name, x, y, result) {
  let sql = `SELECT b.*, a.cnt 
  FROM board AS b 
    LEFT OUTER JOIN 
    (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
    ON b.postID = a.postID 
  WHERE b.postID IN ( SELECT agr.postID 
                      FROM users AS usr 
                        JOIN 
                        agree AS agr 
                        ON usr.userID = agr.userID 
                      WHERE usr.userID = (SELECT userID 
                        FROM users 
                        WHERE username = "${name}"))
    AND 
    b.date BETWEEN DATE_ADD(NOW(),INTERVAL -2 MONTH ) AND NOW()
  ORDER BY date ASC
  LIMIT ${x}, ${y}`;
  conn.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    if (err) return result(err, null);
    console.log("데이터: ", row);
    return result(null, row);
  });
};

// 유저 작성 청원
users.getPosts = function (name, x, y, result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                on b.postID = a.postID 
              WHERE b.userID IN (SELECT userID 
                                  FROM users 
                                  WHERE username = "${name}")
                AND
                b.date BETWEEN DATE_ADD(NOW(),INTERVAL -2 MONTH ) AND NOW()
              LIMIT ${x}, ${y}`;
  conn.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    if (err) return result(err, null);
    console.log("데이터: ", row);
    return result(null, row);
  });
};
module.exports = users;
