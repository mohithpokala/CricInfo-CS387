const express =require('express');
const {player_full_info,scorecard_data,matches_info,match_info,comp,top3batsman,top3bowlers} = require('../Controllers');
const routes = express.Router();

routes.get('/scorecard/:arg1/:arg2/:arg3',scorecard_data);
routes.get('/matches',matches_info);
routes.get('/matches/:match_id',match_info);
routes.get('/scorecomparision/:match_id/:innings_number',comp);
routes.get('/top3batsman/:match_id/:innings_number',top3batsman);
routes.get('/top3bowlers/:match_id/:innings_number',top3bowlers);
routes.get('./player_full_info/:player_id/:type',player_full_info);
module.exports = {routes};