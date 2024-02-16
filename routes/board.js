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
            // TODO: 에러 페이지 보여주기
            res.render('board/post-detail', { post: null }); 
        } else {
            db.query('SELECT * FROM message_replies WHERE message_id = ?', id, (err, replies) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    // TODO: 에러 페이지 보여주기
                    res.render('board/post-detail', { post: null }); 
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
