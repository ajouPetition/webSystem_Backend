const createError = require('http-errors');
const express = require('express');
const path = require('path');

// 라우터 접속
const usersRouter = require('./routes/users');

const app = express();


// view 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', usersRouter);




// 최하단에 둘것
module.exports = app;
