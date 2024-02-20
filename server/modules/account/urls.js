const { Router } = require('express');
const {
	create,
	list,
	update,
	destroy,
	passwordChange,
	passwordReset,
	retrieve
} = require('./controllers/users');
const { validateJWT } = require('../../middlewares/jwt-validate');
const {
	listCampus,
	createCampus,
	updateCampus,
	getCampus,
	destroyCampus
} = require('./controllers/campus');
const router = Router();

router.use(validateJWT);

router.get('/users', list);
router.post('/create', create);
router.get('/:id/retrieve', retrieve);
router.put('/:id/update', update);
router.delete('/:id/delete', destroy);
router.post('/password-change', passwordChange);
router.get('/:id/password-reset', passwordReset);

router.get('/campus', listCampus);
router.post('/campus/create', createCampus);
router.get('/campus/:code', getCampus);
router.put('/:id/campus/update', updateCampus);
router.delete('/:id/campus/delete', destroyCampus);

module.exports = router;
