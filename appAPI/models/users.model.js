const conn = require("../config/db");

// 유저 모델 선언
let users = function(item){
    this.userID = item.userID
    this.username = item.username
    this.password = item.password
}

// ID 조회
users.findByID = function(userID, result){
    let sql = 'SELECT * FROM users WHERE userID = ?';
    conn.query(sql, userID, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)
        console.log("데이터: ",row)
        result(null,row)
    })
}

// 유저 생성
users.create = function(newUser, result){
    let data = [newUser.userID, newUser.username, newUser.password]
    sql = 'INSERT INTO users(userID, username, password) VALUES(?, ?, ?)'
    conn.query(sql, data, (err,row,fields)=>{
        console.log('Error:', err)
        if(err) result(err,null)
        console.log(row)
        result(null,{'status':'success'})
    })
}

// 유저 정보 수정
users.update = function(user, result){
	let data = [user.password, user.userID]
	sql = 'UPDATE users SET password = ? WHERE userID = ?';
	conn.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		console.log("변화한 데이터 수: ", row.affectedRows);
		result(null, {'status':'success'});
	});
};

// 유저 데이터 삭제
users.delete = function(id, result){
	let sql = 'DELETE FROM users WHERE userID = ?';
	conn.query(sql, id, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		console.log("삭제된 데이터 수: ", row.affectedRows);
		result(null, {'status':'success'});
	});
};

module.exports= users;