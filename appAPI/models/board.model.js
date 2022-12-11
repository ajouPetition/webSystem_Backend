const conn = require('../config/db');

// 게시물 모델 선언
let board = function (item) {
  this.postID = item.postID;
  this.title = item.title;
  this.type = item.type;
  this.userID = item.userID;
  this.date = item.date;
  this.content = item.content;
};

// 게시물 전체 카운트 수
board.countPosts = function (option, result) {
  let sql = `SELECT COUNT(*) FROM board WHERE (date BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY)) `;
  // 종류별
  switch (option.type) {
    case '전체':
      break;
    default:
      sql = sql + 'AND type = "' + option.type + '"';
      break;
  }
  conn.query(sql, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 만료된 게시물 전체 카운트 수
board.expireCountPosts = function (option, result) {
  let sql = `SELECT COUNT(*) FROM board WHERE (date NOT BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY) AND DATE_ADD(NOW(),INTERVAL 1 DAY))`;
  // 종류별
  switch (option.type) {
    case '전체':
      break;
    default:
      sql = sql + 'AND type = "' + option.type + '"';
      break;
  }
  conn.query(sql, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};
// 게시물 Limit
board.viewLimit = function (x, y, result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                ON b.postID = a.postID 
            WHERE b.date BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY)
            LIMIT ${x}, ${y}`;
  conn.query(sql, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 게시물 Top 3 조회
board.viewTop = function (result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                ON b.postID = a.postID 
              WHERE b.date BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY)
              ORDER BY a.cnt DESC 
              LIMIT 3`;
  conn.query(sql, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 만료 임박 게시물 Top 3 조회
board.viewTopDateAsc = function (result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                ON b.postID = a.postID 
              WHERE b.date BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY)
              ORDER BY date ASC 
              LIMIT 3`;
  conn.query(sql, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 만료 게시물 필터링 조회
board.expireFilter = function (option, result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                ON b.postID = a.postID `;
  // 종류별
  switch (option.type) {
    case '전체':
      sql =
        sql +
        'WHERE date NOT BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY)';
      break;
    default:
      sql =
        sql +
        'WHERE type = "' +
        option.type +
        '" AND (date NOT BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY) )';
      break;
  }
  // 달성여부
  console.log(option.pass);
  if (option.pass == 100) {
    sql = sql + ' AND a.cnt >= 100';
  } else {
    sql = sql + ' AND (a.cnt < 100 OR a.cnt IS NULL)';
  }
  sql = sql + ` LIMIT ${option.startAt}, ${option.limit}`;
  conn.query(sql, option.type, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 게시물 필터링 조회
board.filter = function (option, result) {
  let sql = `SELECT b.*, a.cnt 
              FROM board AS b 
                LEFT OUTER JOIN 
                (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a 
                ON b.postID = a.postID 
              WHERE date BETWEEN DATE_ADD(NOW(),INTERVAL -60 DAY ) AND DATE_ADD(NOW(),INTERVAL 1 DAY) `;
  // 종류별
  switch (option.type) {
    case '전체':
      break;
    default:
      sql = sql + 'AND type = "' + option.type + '" ';
      break;
  }
  // 정렬순서
  sql = sql + ' ORDER BY';
  if (option.orderBy == 'cnt') {
    sql = sql + ' cnt desc';
  } else {
    sql = sql + ' date ' + option.orderBy;
  }
  sql = sql + ` LIMIT ${option.startAt}, ${option.limit}`;
  conn.query(sql, option.type, (err, row, fields) => {
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// ID 조회
board.findByID = function (id, result) {
  let sql = 'SELECT * FROM board WHERE postID = ?';
  conn.query(sql, id, (err, row, fields) => {
    console.log('Error:', err);
    if (err) return result(err, null);
    console.log('데이터: ', row);
    return result(null, row);
  });
};

// 게시물 작성
board.create = function (newPost, result) {
  let data = [
    newPost.postID,
    newPost.title,
    newPost.type,
    newPost.userID,
    newPost.date,
    newPost.content,
  ];
  let sql =
    'INSERT INTO board(postID, title, type, userID, date, content) VALUES(?, ?, ?, ?, ?, ?)';
  conn.query(sql, data, (err, row, fields) => {
    console.log('Error:', err);
    if (err) return result(err, null);
    console.log('OK');
    return result(null, { status: 'success' });
  });
};

// 게시물 수정 <- 청원 내용이 수정될 가능성인데 추가할지 모르겠음
// board.update = function (newPost, result) {
//   let data = [newPost.title, newPost.content, newPost.postID];
//   let sql = 'UPDATE board SET title = ?, content = ? WHERE postID = ?';
//   conn.query(sql, data, (err, row, fields) => {
//     console.log('error: ', err);
//     if (err) result(err, null);
//     console.log('변화한 데이터 수: ', row.affectedRows);
//     result(null, { status: 'success' });
//   });
// };

// 게시물 삭제
board.delete = function (id, result) {
  let sql = 'DELETE FROM board WHERE postID = ?';
  conn.query(sql, id, (err, row, fields) => {
    console.log('error: ', err);
    if (err) return result(err, null);
    console.log('삭제된 데이터 수: ', row.affectedRows);
    return result(null, { status: 'success' });
  });
};

module.exports = board;
