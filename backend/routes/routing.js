const express = require('express');
const { pointTableController } = require('../controllers/pointTable.controller');
const { upcomingMatchesController, pastMatchesController, getMatchInfo, getMatchDetails } = require('../controllers/matches.controller');

const router = express.Router();

router.get('/points-table/:type/:season', pointTableController);
router.get('/matches/upcoming', upcomingMatchesController);
router.get('/matches/past', pastMatchesController);
router.get('/match/:id/:module/:teamCode/results', getMatchInfo);
router.get('/match/:id/:type/details', getMatchDetails);


module.exports = router;
