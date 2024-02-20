const { Router } = require('express');
const { listCampus } = require('../account/controllers/campus');
const { withRegistry } = require('./controllers/bay');
const { arrivals } = require('./controllers/registry');
const { retrieveTruckTypeByType } = require('./controllers/truck-type');
const router = Router();

router.get('/campus', listCampus);
router.get('/bays', withRegistry);
router.get('/registries', arrivals);
router.get('/truck-type/:type/retrieveByType', retrieveTruckTypeByType);

module.exports = router;
