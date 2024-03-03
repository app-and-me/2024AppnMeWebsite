const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// data.json 파일의 경로
const dataPath = path.join(__dirname, 'data.json');

router.get('/', (req, res) => {
    res.render('records/records');
});

router.get('/details', (req, res) => {
    // data.json 파일을 읽어옴
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).render('error', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            // 기수, 전공, 인덱스 쿼리스트링 파라미터 가져오기
            const cohort = req.query.cohort || '11'; // 디폴트는 11
            const major = req.query.major || 'dev'; // 디폴트는 dev
            const index = req.query.index || 0;

            // 선택된 기수 및 전공에 해당하는 데이터 가져오기
            const selectedData = jsonData.records[cohort] && jsonData.records[cohort][major]
                && jsonData.records[cohort][major][index] || [];

            // namelist 데이터 가져오기
            const namelist = jsonData.namelist[cohort][major] || [];

            res.render('records/record-details', { records: selectedData, namelist, cohort, major, index });
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            res.status(500).render('error', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
        }
    });
});

module.exports = router;
