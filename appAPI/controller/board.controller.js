const board = require("../models/board.model")
const conn = require("../config/db");

// 게시물 전체 조회
exports.viewAll = function(req,res){
    board.viewAll(function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 게시물 Top 3 조회
exports.viewTop = function(req,res){
    board.viewTop(function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 게시물 필터링 조회
exports.filter = function(req,res){
    board.filter(req.body, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}

// ID 조회
exports.findByID = function(req,res){
    board.findByID(req.params.postID, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 게시물 작성
exports.create = function(req,res){
    console.log(req.body)
    const today = new Date()
    req.body.date = today.getFullYear().toString() + '-' + (today.getMonth()+1).toString() + '-' + today.getDate().toString() +' 9:00'
    console.log(req.body.date)
    console.log()
    let sql = 'SELECT max(postID) as ID from board'
    conn.query(sql,(err, row, fields) => {
		console.log("error: ", err);
		console.log("입력될 ID: ", row[0]['ID']+1);
        req.body.postID = row[0]['ID']+1
        board.create(req.body, function(err,result){
            if(err) res.send(err)
            res.json(result)
        })
	});
}

// 게시물 수정 <- 청원 내용이 수정될 가능성인데 추가할지 모르겠음
exports.update = function(req,res){
    console.log(req.body)
    board.update(req.body, function(err, result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 게시물 삭제
exports.delete = function(req,res){
    board.delete(req.params.postID, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}