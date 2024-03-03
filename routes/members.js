const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const memberDataPath = path.join(__dirname, 'data.json');

router.get('/', (req, res) => {
    fs.readFile(memberDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).render('error404', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
            return;
        }

        try {
            const memberData = JSON.parse(data);

            // 기수 및 전공 쿼리스트링 파라미터 가져오기
            const cohort = req.query.cohort || 'cohort11'; // 디폴트는 cohort11
            const major = req.query.major || 'software';  // 디폴트는 software

            // 선택된 기수 및 전공에 해당하는 데이터 가져오기
            const selectedData = memberData[cohort] && memberData[cohort][major] || [];

            // 렌더링
            res.render('members/members', { members: selectedData, cohort, major });
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            res.status(500).render('error404', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
        }
    });
});

module.exports = router;
