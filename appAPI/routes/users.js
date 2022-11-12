var express = require('express');
var router = express.Router();
const users = require("../controller/users.controller")

// 도메인/api/users/ 주소
router.post('/auth',users.login)
router.get('/:userID', users.findByID);
router.post('/register',users.create)
router.put('/modify',users.update)
router.delete('/delete/:userID',users.delete)

module.exports = router;
