const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 새로운 메시지 등록 API
router.post('/', (req, res) => {
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
router.get('/', (req, res) => {
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
router.post('/:id/replies', (req, res) => {
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
router.get('/with-replies', (req, res) => {
  db.query('SELECT qna.*, message_replies.reply_text, message_replies.reply_time FROM qna LEFT JOIN message_replies ON qna.id = message_replies.message_id', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: '메시지 및 답변을 불러오지 못했습니다.' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
