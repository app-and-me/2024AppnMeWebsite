const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// public 폴더를 정적 파일 제공을 위한 미들웨어로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 라우트는 여기에 추가하기

// 서버 시작
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
