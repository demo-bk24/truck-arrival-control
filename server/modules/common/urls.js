const { Router } = require('express');
const { getDate, getMonths } = require('./controllers/common');

const router = Router();

router.get('/date', getDate);
router.get('/months', getMonths);

module.exports = router;
