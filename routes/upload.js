const express = require('express');
const router = express.Router();
const db = require('../database/database');

// qna 업로드 페이지
router.get('/', (req, res) => {
    res.render('upload/upload');
});

// 업로드 성공 페이지
router.get('/success-upload', (req, res) => {
    res.render('upload/success-upload');
})

// 새로운 qna 등록
router.post('/', (req, res) => {
    const message = req.body;

    db.query('INSERT INTO qna SET ?', message, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(404).render('error404', {error: {code: 404, message: '요청한 페이지를 찾을 수 없어요.'}});
        } else {
            res.redirect('/upload/success-upload');
        }
    });
});

module.exports = router;
