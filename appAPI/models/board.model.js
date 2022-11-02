const conn = require("../config/db");

// 유저 모델 선언
let board = function(item){
    this.postID = item.postID
    this.title = item.title
    this.type = item.type
    this.userID = item.userID
    this.date = item.date
    this.content = item.content
}

// ID 조회
board.findByID = function(id, result){
    let sql = 'SELECT * FROM board WHERE postID = ?';
    conn.query(sql, id, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)

        console.log("데이터: ",row)
        result(null,row)
    })
}

// 게시물 작성
board.create = function(newPost, result){
    let data = [newPost.postID, newPost.title, newPost.type, newPost.userID, newPost.date, newPost.content]
    let sql = 'INSERT INTO board(postID, title, type, userID, date, content) VALUES(?, ?, ?, ?, ?, ?)'
    conn.query(sql, data, (err,row,fields)=>{
        console.log('Error:', err)
        if(err) result(err,null)
        console.log('OK')
        result(null,{'status':'success'})
    })
}

// 게시물 수정 <- 청원 내용이 수정될 가능성인데 추가할지 모르겠음
board.update = function(newPost, result){
	let data = [newPost.title, newPost.content, newPost.postID]
	let sql = 'UPDATE board SET title = ?, content = ? WHERE postID = ?';
	conn.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		console.log("변화한 데이터 수: ", row.affectedRows);
		result(null, {'status':'success'});
	});
};

// 게시물 삭제
board.delete = function(id, result){
	let sql = 'DELETE FROM board WHERE postID = ?';
	conn.query(sql, id, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		console.log("삭제된 데이터 수: ", row.affectedRows);
		result(null, {'status':'success'});
	});
};

module.exports= board;