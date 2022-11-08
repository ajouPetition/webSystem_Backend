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
    console.log(req.body)
    let today = new Date()
    today.setHours(today.getHours() + 9)
    req.body.date = today.getFullYear().toString() + '-' + (today.getMonth()+1).toString() + '-' + today.getDate().toString() + ' ' + today.getHours().toString() + ':' + today.getMinutes().toString()
    console.log(req.body.date)
    console.log()
    let sql = 'SELECT max(commentID) as ID from comments'
    conn.query(sql,(err, row, fields) => {
		console.log("error: ", err);
		console.log("입력될 ID: ", row[0]['ID']+1);
        req.body.commentID = row[0]['ID']+1
        comments.create(req.body, function(err,result){
            if(err) res.send(err)
            res.json(result)
        })
	});
}

// 댓글 수정
exports.update = function(req,res){
    console.log(req.body)
    comments.update(req.body, function(err, result){
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