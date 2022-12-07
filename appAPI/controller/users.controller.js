const users = require("../models/users.model");
const conn = require("../config/db");

//로그인
exports.login = function (req, res) {
  users.login(req.body, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// ID 조회
exports.findByID = function (req, res) {
  users.findByID(req.params.username, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 유저 생성
exports.create = function (req, res) {
  // console.log(req.body);
  let sql = "SELECT max(userID) as ID from users";
  conn.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    console.log("입력될 ID: ", row[0]["ID"] + 1);
    req.body.userID = row[0]["ID"] + 1;
    users.create(req.body, function (err, result) {
      if (err) return res.send(err);
      return res.json(result);
    });
  });
};

// 유저 정보 수정
exports.update = function (req, res) {
  users.update(req.body, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 유저 데이터 삭제
exports.delete = function (req, res) {
  users.delete(req.params.username, function (err, result) {
    if (err) return res.send(err);
    return res.json(result);
  });
};

// 유저 동의 데이터
exports.agreePosts = function (req, res){
  // console.log(req.params.username, Number(req.body.startAt), Number(req.body.limit))
  users.agreePosts(req.params.username, Number(req.body.startAt), Number(req.body.limit),
   function (err, result){
    if (err) return res.send(err);
    return res.json(result);
  })
}

// 유저 작성 청원
exports.getPosts = function(req, res){
  // console.log(req.params.username, Number(req.body.startAt), Number(req.body.limit))
  users.getPosts(req.params.username, Number(req.body.startAt), Number(req.body.limit),
  function (err, result){
    if (err) return res.send(err);
    return res.json(result);
  })
}