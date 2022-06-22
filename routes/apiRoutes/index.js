// PURPOSE: we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application

const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('./zookeeperRoutes');

router.use(animalRoutes);
router.use(zookeeperRoutes);

module.exports = router;