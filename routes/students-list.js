const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 학생 정보 조회 페이지 라우터
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('students', { students: results });
    }
  });
});

module.exports = router;
