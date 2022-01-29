const express =require('express');
const {bat_stats,bowl_stats,misc_info,umpire_info,player_info} = require('../Controllers');
const { summary } = require('../Controllers/scoreboard.controller');
const routes = express.Router();

routes.get('/scorecard/bat_stats/:match_id/:innings_number',bat_stats);
routes.get('/scorecard/bowl_stats/:match_id/:innings_number',bowl_stats);
routes.get('/scorecard/misc_info/:match_id/',misc_info);
routes.get('/scorecard/umpire_info/:match_id/',umpire_info);
routes.get('/scorecard/player_info/:match_id/',player_info);
routes.get('/scorecard/scorecard_summary/:match_id/:team_number',summary);

module.exports = {routes};