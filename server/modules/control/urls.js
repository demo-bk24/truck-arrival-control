const { Router } = require('express');
const { validateJWT } = require('../../middlewares/jwt-validate');
const {
	createLift,
	listLift,
	updateLift,
	destroyLift,
	retrieveLift
} = require('./controllers/lift');
const {
	listBay,
	createBay,
	updateBay,
	destroyBay,
	retrieveBay,
	withRegistry
} = require('./controllers/bay');
const {
	listTruck,
	createTruck,
	retrieveTruck,
	updateTruck,
	destroyTruck,
	searchTruck
} = require('./controllers/truck');
const {
	listRegistry,
	createRegistry,
	registryForNow,
	initialRegistry,
	arrivals,
	updateRegistry,
	destroyRegistry,
	retrieveRegistry,
	loadTruck,
	unloadTruck
} = require('./controllers/registry');
const {
	listTruckType,
	createTruckType,
	retrieveTruckType,
	updateTruckType,
	destroyTruckType,
	retrieveTruckTypeByType
} = require('./controllers/truck-type');
const {
	createLiftOperator,
	destroyLiftOperator,
	retrieveMyLift
} = require('./controllers/lift-operator');
const router = Router();

router.use(validateJWT);

router.get('/bay/list', listBay);
router.post('/bay/create', createBay);
router.get('/bay/:id/retrieve', retrieveBay);
router.put('/bay/:id/update', updateBay);
router.delete('/bay/:id/delete', destroyBay);
router.get('/bay/withregistry', withRegistry);

router.get('/lift/list', listLift);
router.post('/lift/create', createLift);
router.get('/lift/:id/retrieve', retrieveLift);
router.put('/lift/:id/update', updateLift);
router.delete('/lift/:id/delete', destroyLift);

router.post('/lift-operator/create', createLiftOperator);
router.delete('/lift-operator/:id/delete', destroyLiftOperator);
router.get('/lift-operator/mylift', retrieveMyLift);

router.get('/truck/list', listTruck);
router.post('/truck/create', createTruck);
router.get('/truck/:id/retrieve', retrieveTruck);
router.get('/truck/search', searchTruck);
router.put('/truck/:id/update', updateTruck);
router.delete('/truck/:id/delete', destroyTruck);

router.get('/truck-type/list', listTruckType);
router.post('/truck-type/create', createTruckType);
router.get('/truck-type/:id/retrieve', retrieveTruckType);
router.get('/truck-type/:type/retrieveByType', retrieveTruckTypeByType);
router.put('/truck-type/:id/update', updateTruckType);
router.delete('/truck-type/:id/delete', destroyTruckType);

router.get('/registry/list', listRegistry);
router.post('/registry/create', createRegistry);
router.put('/registry/:id/update', updateRegistry);
router.get('/registry/:id/retrieve', retrieveRegistry);
router.delete('/registry/:id/delete', destroyRegistry);
router.get('/registry/fornow', registryForNow);
router.get('/registry/initial', initialRegistry);
router.get('/registry/arrivals', arrivals);

router.get('/registry/unload-truck', unloadTruck);
router.get('/registry/load-truck', loadTruck);

module.exports = router;
