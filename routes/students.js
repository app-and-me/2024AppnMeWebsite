const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 학생 정보 등록 API
router.post('/', (req, res) => {
  const student = req.body;

  db.query('INSERT INTO students SET ?', student, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '학생 정보가 들어가지 못했습니다!!' });
    } else {
      res.status(201).json({ message: '학생 정보가 성공적으로 들어갔습니다!!' });
    }
  });
});


// 학생 정보 조회 API
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '학생 정보를 불러오지 못했습니다!!' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
