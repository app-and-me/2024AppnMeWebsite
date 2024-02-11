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
            res.render('board/post-detail')
        } else {
            db.query('SELECT * FROM message_replies WHERE message_id = ?', id, (err, replies) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    // TODO: 에러 페이지 보여주기
                    res.render('board/post-detail')
                } else {
                    replies.map(reply => {
                        return {
                            ...posts[0],
                            reply: {
                                ...reply
                            }
                        }
                    });

                    res.render('board/post-detail', { post: posts[0] })
                }
            })
            console.log({ post: posts[0] })
        }
    });
});

// 게시물 생성 페이지 렌더링
router.get('/upload', (req, res) => {
    res.render('board/create-post');
});

// 새로운 메시지 등록 API
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
