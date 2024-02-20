const { Router } = require('express');
const { create, get } = require('../controllers/users');
const { validateJWT } = require('../middlewares/jwt-validate');
const router = Router();

router.post('/new', create);
router.get('/', get);

module.exports = router;
