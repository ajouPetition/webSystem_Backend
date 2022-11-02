const conn = require("../config/db");

// 유저 모델 선언
let users = function(item){
    this.userID = item.userID
    this.username = item.username
    this.password = item.password
}

users.findByID = function(id, result){
    let sql = 'SELECT * FROM users WHERE userID = ?';
    conn.query(sql, id, (err,row,fields) => {
        console.log('Error:', err)
        if(err) result(err,null)

        console.log("데이터: ",row)
        result(null,row)
    })
}

users.create = function(newUser, result){
    let data = [newUser.userID, newUser.username, newUser.password]
    let sql = 'INSERT INTO users(userID, username, password) VALUES(?, ?, ?)'

    conn.query(sql, data, (err,row,fields)=>{
        console.log('Error:', err)
        if(err) result(err,null)

        console.log(row.insertId)
        result(null,row.insertId)
    })
}

users.update = function(item, result){
	let data = [newUser.username, newUser.password, newUser.userID]
	
	let sql = 'UPDATE items SET username = ?, password = ? WHERE userID = ?';
	
	con.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log("변화한 데이터 수: ", row.affectedRows);
		result(null, row.affectedRows);
	});
};

users.delete = function(id, result){
	let sql = 'DELETE FROM users WHERE userID = ?';
	
	conn.query(sql, id, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log("삭제된 데이터 수: ", row.affectedRows);
		result(null, row.affectedRows);
	});
};

module.exports= users;