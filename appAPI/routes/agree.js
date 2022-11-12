// 테스트용으로만 사용해주세요
var express = require('express');
var router = express.Router();
const agree = require("../controller/agree.controller")

// 도메인/api/agree/ 주소
router.post('/agree', agree.AgreeByPost);
router.get('/post/:postID', agree.getAgreeByPost)


module.exports = router;
