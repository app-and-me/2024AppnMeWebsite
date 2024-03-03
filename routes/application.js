const express = require('express');
const router = express.Router();
const db = require('../database/database');

// application html 페이지 렌더링
router.get('/', (req, res) => {
    res.render('application/application');
});

// 지원서 제출 api
router.post('/', (req, res) => {
    const student = req.body;
    const studentData = { ...student};

    db.query('INSERT INTO students SET ?', studentData, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(404).render('error404', {error: {code: 404, message: '요청한 페이지를 찾을 수 없어요.'}});
        } else {
            // 요청 성공 시 success apply 페이지로 이동함
            res.render('application/success-apply');
        }
    });
});


module.exports = router;
