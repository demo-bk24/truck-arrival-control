const { Router } = require('express');
const {
	login,
	renewToken,
	existUser,
	register
} = require('./controllers/auth');
const { validateJWT } = require('../../middlewares/jwt-validate');
const router = Router();

router.post('/login', login);
router.get('/exist-user', existUser);
router.post('/register', register);
router.get('/renew', validateJWT, renewToken);

module.exports = router;
