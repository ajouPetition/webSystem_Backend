const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors");

// 라우터 선언
const usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const commentsRouter = require('./routes/comments');

const app = express();
// 엔진 설정
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터 접속
app.use('/api/users', usersRouter);
app.use('/api/board', boardRouter);
app.use('/api/comments', commentsRouter);

// 최하단에 둘것
module.exports = app;
