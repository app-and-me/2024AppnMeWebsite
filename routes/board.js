const express = require('express');
const router = express.Router();

// 게시판 목록 html 렌더링
router.get('/', (req, res) => {
    res.render('board/list');
});

router.get('/post', (req, res) => {
    res.render('board/post');
});

module.exports = router;
