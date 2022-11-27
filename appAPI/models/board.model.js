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
board.countPosts = function (result) {
  let sql = `SELECT COUNT(*) FROM board`;
  conn.query(sql, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// 게시물 Limit
board.viewLimit = function (x, y, result) {
  let sql = `SELECT b.*, a.cnt FROM board AS b LEFT OUTER JOIN (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a on b.postID = a.postID LIMIT ${x}, ${y}`;
  conn.query(sql, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// 게시물 Top 3 조회
board.viewTop = function (result) {
  let sql =
    'SELECT b.*, a.cnt FROM board AS b LEFT OUTER JOIN (SELECT postID, count(*) AS cnt FROM agree GROUP BY postID) AS a on b.postID = a.postID ORDER BY a.cnt DESC LIMIT 3';
  conn.query(sql, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// 게시물 필터링 조회 (종류, 날짜 동시 가능)
board.filter = function (option, result) {
  let sql = 'SELECT postID, title, type, date FROM board';
  // 종류별
  if (option.type != undefined)
    sql = sql + ' WHERE type = "' + option.type + '"';
  // 날짜별
  if (option.date != undefined) sql = sql + ' ORDER BY date ' + option.date;
  console.log(option.type, option.date);
  conn.query(sql, option.type, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// ID 조회
board.findByID = function (id, result) {
  let sql = 'SELECT * FROM board WHERE postID = ?';
  conn.query(sql, id, (err, row, fields) => {
    console.log('Error:', err);
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
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
    if (err) result(err, null);
    console.log('OK');
    result(null, { status: 'success' });
  });
};

// 게시물 수정 <- 청원 내용이 수정될 가능성인데 추가할지 모르겠음
board.update = function (newPost, result) {
  let data = [newPost.title, newPost.content, newPost.postID];
  let sql = 'UPDATE board SET title = ?, content = ? WHERE postID = ?';
  conn.query(sql, data, (err, row, fields) => {
    console.log('error: ', err);
    if (err) result(err, null);
    console.log('변화한 데이터 수: ', row.affectedRows);
    result(null, { status: 'success' });
  });
};

// 게시물 삭제
board.delete = function (id, result) {
  let sql = 'DELETE FROM board WHERE postID = ?';
  conn.query(sql, id, (err, row, fields) => {
    console.log('error: ', err);
    if (err) result(err, null);
    console.log('삭제된 데이터 수: ', row.affectedRows);
    result(null, { status: 'success' });
  });
};

module.exports = board;
