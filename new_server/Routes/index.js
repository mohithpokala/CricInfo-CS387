const express =require('express');
const {player_full_info,scorecard_data,matches_info,match_info,comp,top3batsman,top3bowlers,pointstable,Venue,Venue_id,Venueb_id,Venuec_id} = require('../Controllers');
const routes = express.Router();

routes.get('/scorecard/:arg1/:arg2/:arg3',scorecard_data);
routes.get('/matches',matches_info);
routes.get('/matches/:match_id',match_info);
routes.get('/scorecomparision/:match_id/:innings_number',comp);
routes.get     ('/top3batsman/:match_id/:innings_number',top3batsman);
routes.get('/top3bowlers/:match_id/:innings_number',top3bowlers);
routes.get('/players/:player_id/:type',player_full_info);
routes.get('/pointstable/:year',pointstable);
routes.get('/venue',Venue);
routes.get('/venue/:venue_id',Venue_id);   // Basic Info
routes.get('/venue/b/:venue_id',Venueb_id); //Win percentage
routes.get('/venue/c/:venue_id',Venuec_id);  //Avg First innings Score
module.exports = {routes};