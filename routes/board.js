const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 게시판 목록 렌더링
router.get('/', (req, res) => {
    db.query('SELECT * FROM qna', (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: '메시지를 불러오지 못했습니다!!' });
        } else {
            res.status(200).render('board/posts', { posts: results });
        }
    });
});

// 하나의 게시글 불러오기
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM qna WHERE id = ?', id, (err, posts) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(404).render('error404', {error: {code: 404, message: '요청한 페이지를 찾을 수 없어요.'}});
        } else {
            db.query('SELECT * FROM message_replies WHERE message_id = ?', id, (err, replies) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    res.status(404).render('error404', {error: {code: 404, message: '요청한 페이지를 찾을 수 없어요.'}});
                } else {
                    const post = posts[0];
                    const postWithReplies = { ...post, replies };

                    console.log(postWithReplies)
                    res.render('board/post-detail', { post: postWithReplies });
                }
            });
        }
    });
});

module.exports = router;
