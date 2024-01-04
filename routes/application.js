const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('application');
});

module.exports = router;
