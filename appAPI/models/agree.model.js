const conn = require("../config/db");

// 동의 모델 선언
let agree = function(item){
    this.postID = item.postID
    this.userID = item.userID
}

// 동의하기
agree.addAgreeByPost = function(ID, result){
    let data = [ID.postID, ID.userID]
    let sql = 'INSERT INTO agree(postID,userID) VALUES (?,?)';
    conn.query(sql, data, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)
        console.log("OK",)
        result(null,{'status':'success', 'action':'add Agree'})
    })
}

// 동의 취소하기
agree.delAgreeByPost = function(ID, result){
    let data = [ID.postID, ID.userID]
    let sql = 'DELETE FROM agree WHERE postID=? and userID=?';
    conn.query(sql, data, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)
        console.log("OK",)
        result(null,{'status':'success', 'action':'delete Agree'})
    })
}

// 특정 게시물 동의 수
agree.getAgreeByPost = function(ID, result){
    let sql = 'SELECT count(*) as num FROM agree WHERE postID=?';
    conn.query(sql, ID, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)
        console.log('게시물',ID,"동의 개수: ",row[0].num)
        result(null,row[0].num)
    })
}

module.exports= agree;