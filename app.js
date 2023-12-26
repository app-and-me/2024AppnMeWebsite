const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'website'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 에러가 났습니다!:', err);
  } else {
    console.log('MySQL 연결이 되었습니다!');
  }
});

// body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public 폴더를 정적 파일 제공을 위한 미들웨어로 설정
app.use(express.static(path.join(__dirname, 'public')));

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

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
