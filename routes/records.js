const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('records/records');
});

router.get('/11/developers', (req, res) => {
    res.render('records/dev11');
});

router.get('/11/designers', (req, res) => {
    res.render('records/design11');
});

router.get('/12/developers', (req, res) => {
    res.render('records/dev12');
});

router.get('/12/designers', (req, res) => {
    res.render('records/design12');
});

module.exports = router;
