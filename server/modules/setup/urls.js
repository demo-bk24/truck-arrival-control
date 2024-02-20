const { Router } = require('express');
const { validateJWT } = require('../../middlewares/jwt-validate');
const { getYears, getMonths, getDays } = require('./controllers/setup');

const router = Router();

router.use(validateJWT);
router.get('/years', getYears);
router.get('/months/:year', getMonths);
router.get('/days/:year/:month', getDays);

module.exports = router;
