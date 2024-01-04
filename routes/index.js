// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // 'index' 템플릿을 렌더링하고 클라이언트에게 전달
    res.render('index', { username: 'John' });
});

module.exports = router;
