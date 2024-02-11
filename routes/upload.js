const express = require('express');
const router = express.Router();
const db = require('../database/database');

// qna 업로드 페이지
router.get('/', (req, res) => {
    res.render('upload/upload');
});

// 새로운 qna 등록 
router.post('/', (req, res) => {
    const message = req.body;

    db.query('INSERT INTO qna SET ?', message, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);

            // TODO: 실패 페이지 만들기
            res.render('board/create-post');
        } else {
            res.render('board/posts', { result })
        }
    });
});

module.exports = router;
