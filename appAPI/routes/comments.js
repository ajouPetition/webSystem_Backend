var express = require('express');
var router = express.Router();
const comments = require('../controller/comments.controller');

// 도메인/api/comments/ 주소
router.get('/countComments/:postID', comments.countComments);
router.get('/view/:postID', comments.findByPostID);
router.post('/upload', comments.create);
router.put('/modify', comments.update);
router.delete('/delete/:commentID', comments.delete);

module.exports = router;
