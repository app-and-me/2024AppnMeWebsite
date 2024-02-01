const express = require('express');
const router = express.Router();

// application html 페이지 렌더링
router.get('/', (req, res) => {
    res.render('application');
});

// 지원 성공 시 html 페이지 렌더링

router.get('/success', (req, res) => {
    res.render('success_apply')
});



module.exports = router;
