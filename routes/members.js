const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// memberData.json 파일의 경로
const memberDataPath = path.join(__dirname, 'data.json');

// 멤버 정보를 렌더링
router.get('/', (req, res) => {
    // memberData.json 파일을 읽어옴
    fs.readFile(memberDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading memberData.json:', err);
            res.status(500).render('error404', {error: {code: 500, message: '서버가 응답하지 않습니다.'}});
            return;
        }

        try {
            // JSON 파싱
            const memberData = JSON.parse(data);
            console.log(memberData)
            console.log({ members: memberData.members11 })
            // 멤버 정보를 사용하여 members.ejs 렌더링
            res.render('members/members', { members: memberData.members11 });
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            res.status(500).render('error404', {error: {code: 500, message: '서버가 응답하지 않습니다.'}});
        }
    });
});

module.exports = router;
