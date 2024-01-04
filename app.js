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
const indexRouter = require('./routes/index');              // 인덱스
const membersRouter = require('./routes/members');          // 부원 소개
const applicationRouter = require('./routes/application');  // 지원하기
const qnaRouter = require('./routes/qna');                   // QnA
const recordsRouter = require('./routes/records');          // 활동 기록
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/application', applicationRouter);
app.use('/qna', qnaRouter);
app.use('/records', recordsRouter);

// 학생 정보 등록 API
app.post('/students', (req, res) => {
  const student = req.body;

  const { student_id, ...studentData } = student;

  db.query('INSERT INTO students SET ?', studentData, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '학생 정보가 들어가지 못했습니다!!' });
    } else {
      res.status(201).json({ message: '학생 정보가 성공적으로 들어갔습니다!!' });
    }
  });
});

// 학생 정보 조회 API
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '학생 정보를 불러오지 못했습니다!!' });
    } else {
      res.status(200).json(results);
    }
  });
});

// 새로운 메시지 등록 API
app.post('/messages', (req, res) => {
  const message = req.body;

  db.query('INSERT INTO qna SET ?', message, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '메시지가 등록되지 못했습니다!!' });
    } else {
      res.status(201).json({ message: '메시지가 성공적으로 등록되었습니다!!' });
    }
  });
});

// 메시지 조회 API
app.get('/messages', (req, res) => {
  db.query('SELECT * FROM qna', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '메시지를 불러오지 못했습니다!!' });
    } else {
      res.status(200).json(results);
    }
  });
});

// 메시지 답변 등록 API
app.post('/messages/:id/replies', (req, res) => {
    const messageId = req.params.id;
    const replyText = req.body.reply_text;
  
    if (!messageId || !replyText) {
      return res.status(400).json({ error: '메시지 ID와 답변 내용을 모두 제공해야 합니다.' });
    }
  
    db.query('INSERT INTO message_replies (message_id, reply_text) VALUES (?, ?)', [messageId, replyText], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: '메시지 답변을 등록하지 못했습니다.' });
      } else {
        res.status(201).json({ message: '메시지 답변이 성공적으로 등록되었습니다.' });
      }
    });
  });
  
  // 메시지 및 답변 조회 API
  app.get('/messages-with-replies', (req, res) => {
    db.query('SELECT qna.*, message_replies.reply_text, message_replies.reply_time FROM qna LEFT JOIN message_replies ON qna.id = message_replies.message_id', (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: '메시지 및 답변을 불러오지 못했습니다.' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
