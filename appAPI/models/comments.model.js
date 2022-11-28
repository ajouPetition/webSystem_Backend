const conn = require('../config/db');

// 댓글 모델 선언
let comments = function (item) {
  this.commentID = item.commentID;
  this.postID = item.postID;
  this.userID = item.userID;
  this.date = item.date;
  this.content = item.content;
};

// 게시물 댓글 갯수 조회
comments.countComments = function (id, result) {
  let sql = `SELECT COUNT(*) FROM comments WHERE postID = ?`;
  conn.query(sql, id, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// 게시물별 댓글 조회
comments.findByPostID = function (id, x, y, result) {
  let sql = `SELECT * FROM comments WHERE postID = ? LIMIT ${x}, ${y}`;
  conn.query(sql, id, (err, row, fields) => {
    if (err) result(err, null);
    console.log('데이터: ', row);
    result(null, row);
  });
};

// 댓글 작성
comments.create = function (newComment, result) {
  let data = [
    newComment.commentID,
    newComment.postID,
    newComment.userID,
    newComment.date,
    newComment.content,
  ];
  let sql =
    'INSERT INTO comments(commentID, postID, userID, date, content) VALUES(?, ?, ?, ?, ?)';
  conn.query(sql, data, (err, row, fields) => {
    console.log('Error:', err);
    if (err) result(err, null);
    console.log('OK');
    result(null, { status: 'success' });
  });
};

// 댓글 수정
comments.update = function (newComment, result) {
  let data = [newComment.content, newComment.commentID];
  let sql = 'UPDATE comments SET content = ? WHERE commentID = ?';
  conn.query(sql, data, (err, row, fields) => {
    console.log('error: ', err);
    if (err) result(err, null);
    console.log('변화한 데이터 수: ', row.affectedRows);
    result(null, { status: 'success' });
  });
};

// 댓글 삭제
comments.delete = function (id, result) {
  let sql = 'DELETE FROM comments WHERE commentID = ?';
  conn.query(sql, id, (err, row, fields) => {
    console.log('error: ', err);
    if (err) result(err, null);
    console.log('삭제된 데이터 수: ', row.affectedRows);
    result(null, { status: 'success' });
  });
};

module.exports = comments;
