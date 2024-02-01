const express = require('express');
const router = express.Router();

// 게시판 목록 html 렌더링
router.get('/', (req, res) => {
    res.render('board/posts');
});

router.get('/create', (req, res) => {
    res.render('board/create-post');
});

module.exports = router;
