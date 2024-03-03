const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 날짜 형식을 변경하는 함수
function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// 게시판 목록 렌더링
router.get('/', (req, res) => {
    db.query('SELECT * FROM qna', (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(404).render('error404', {error: {code: 404, message: '요청한 페이지를 찾을 수 없어요.'}});
        } else {
            const formattedResults = results.map(result => ({
                ...result,
                question_date: formatDate(result.question_date)
            }));

            console.log(formattedResults)
            res.status(200).render('board/posts', { posts: formattedResults });
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

                    postWithReplies.question_date = formatDate(postWithReplies.question_date);

                    console.log(postWithReplies)
                    res.render('board/post-detail', { post: postWithReplies });
                }
            });
        }
    });
});

module.exports = router;
