const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// data.json 파일의 경로
const dataPath = path.join(__dirname, 'data.json');

router.get('/', (req, res) => {
    res.render('records/records');
});

router.get('/detail', (req, res) => {
    // data.json 파일을 읽어옴
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).render('error', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            const cohort = req.query.cohort || '11';
            const major = req.query.major || 'dev';
            const recordsData = jsonData.records[cohort] && jsonData.records[cohort][major] || [];
            console.log(recordsData);

            res.render('records/record-details', { records: recordsData});
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            res.status(500).render('error', { error: { code: 500, message: '인터넷 서버 에러가 발생했습니다.' } });
        }
    });
});

module.exports = router;
