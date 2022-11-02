const comments = require("../models/comments.model")
const conn = require("../config/db");

// ID 조회
exports.findByPostID = function(req,res){
    comments.findByPostID(req.params.postID, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 게시물별 댓글 조회
exports.create = function(req,res){
    console.log(req.query)
    let today = new Date()
    today.setHours(today.getHours() + 9)
    req.query.date = today.getFullYear().toString() + '-' + (today.getMonth()+1).toString() + '-' + today.getDate().toString() + ' ' + today.getHours().toString() + ':' + today.getMinutes().toString()
    console.log(req.query.date)
    console.log()
    let sql = 'SELECT max(commentID) as ID from comments'
    conn.query(sql,(err, row, fields) => {
		console.log("error: ", err);
		console.log("입력될 ID: ", row[0]['ID']+1);
        req.query.commentID = row[0]['ID']+1
        comments.create(req.query, function(err,result){
            if(err) res.send(err)
            res.json(result)
        })
	});
}

// 댓글 수정
exports.update = function(req,res){
    console.log(req.query)
    comments.update(req.query, function(err, result){
        if(err) res.send(err)
        res.json(result)
    })
}

// 댓글 삭제
exports.delete = function(req,res){
    comments.delete(req.params.commentID, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}