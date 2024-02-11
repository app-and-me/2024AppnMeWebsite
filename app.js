const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// EJS를 템플릿 엔진
app.set('view engine', 'ejs');

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// db
const db = require('./database/database');

// body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 추가
const membersRouter = require('./routes/members');          // 부원 소개
const applicationRouter = require('./routes/application');  // 지원하기
const boardRouter = require('./routes/board');              // QnA
const recordsRouter = require('./routes/records');          // 활동 기록
const uploadRouter = require('./routes/upload');            // QnA 업로드
const studentsRouter = require('./routes/students');   
const messagesRouter = require('./routes/messages');     
const studentsListRouter = require('./routes/students-list');
app.use('/members', membersRouter);
app.use('/application', applicationRouter);
app.use('/board', boardRouter);
app.use('/records', recordsRouter);
app.use('/upload', uploadRouter);
app.use('/api/students', studentsRouter);   
app.use('/api/messages', messagesRouter);
app.use('/api/students-list', studentsListRouter);

app.get('/', (req, res) => {
  res.render('index');
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
