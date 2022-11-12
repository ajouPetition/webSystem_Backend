const agree = require("../models/agree.model")
const conn = require("../config/db");

// 동의하기 && 취소하기
exports.AgreeByPost = function(req,res){
    let sql = 'SELECT count(*) as num FROM agree WHERE postID=? and userID=?'
    let data = [req.body.postID, req.body.userID]
    conn.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
        if(row[0].num>0){
            agree.delAgreeByPost(req.body,function(err,result){
                if(err) res.send(err)
                res.json(result)
            })
        }else{
            agree.addAgreeByPost(req.body, function(err,result){
                if(err) res.send(err)
                res.json(result)
            })
        }
	});
}

exports.getAgreeByPost = function(req, res){
    agree.getAgreeByPost(req.params.postID, function(err,result){
        if(err) res.send(err)
        res.json(result)
    })
}