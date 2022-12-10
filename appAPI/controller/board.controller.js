const board = require('../models/board.model');
const conn = require('../config/db');

// 게시물 카운트 수
exports.countPosts = function (req, res) {
  board.countPosts(req.query, function (err, result) {
    if (err) return res.send(err);
    return res.send(result);
  });
};

//만료 게시물 카운트 수
exports.expireCountPosts = function (req, res) {
  board.expireCountPosts(req.query, function (err, result) {
    if (err) return res.send(err);
    return res.send(result);
  });
};

// 게시물 Limit
exports.viewLimit = function (req, res) {
  board.viewLimit(
    parseInt(req.query.startAt),
    parseInt(req.query.limit),
    function (err, result) {
      if (err) return res.send(err);
      return res.json(result);
    }
  );
};

// 게시물 Top 3 조회
exports.viewTop = function (req, res) {
  board.viewTop(function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 게시물 필터링 조회
exports.filter = function (req, res) {
  board.filter(req.query, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 만료 게시물 필터링 조회
exports.expireFilter = function (req, res) {
  board.expireFilter(req.query, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// ID 조회
exports.findByID = function (req, res) {
  board.findByID(req.params.postID, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 게시물 작성
exports.create = function (req, res) {
  const today = new Date();
  req.body.date =
    today.getFullYear().toString() +
    '-' +
    (today.getMonth() + 1).toString() +
    '-' +
    today.getDate().toString() +
    ' 9:00';
  let sql1 = 'SELECT max(postID) as ID from board';
  conn.query(sql1, (err, row, fields) => {
    console.log('error: ', err);
    console.log('입력될 ID: ', row[0]['ID'] + 1);
    req.body.postID = row[0]['ID'] + 1;
    let sql2 = `SELECT userID FROM users WHERE username="${req.body.username}"`
    conn.query(sql2, (err, row) =>{
      console.log('error: ', err);
      console.log('userID: ', row)
      req.body.userID = row[0]['userID']
      // console.log(req.body);
      board.create(req.body, function (err, result) {
        if (err) return res.send(err);
        return res.json(result);
      });
    })
  });
};

// 게시물 수정 <- 청원 내용이 수정될 가능성인데 추가할지 모르겠음
// exports.update = function (req, res) {
//   console.log(req.body);
//   board.update(req.body, function (err, result) {
//     if (err) return res.send(err);
//     return res.json(result);
//   });
// };

// 게시물 삭제
exports.delete = function (req, res) {
  board.delete(req.params.postID, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};
