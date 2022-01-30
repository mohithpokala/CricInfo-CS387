const {scorecard_data} = require('./B2.controller');
const {matches_info,match_info}=require('./B1.contoller');
const {comp} = require('./B3.controller');
const {top3bowlers,top3batsman} = require('./B4.controller');
const {player_full_info} = require('./C.controller');
module.exports= {player_full_info,top3batsman,top3bowlers,scorecard_data,matches_info,match_info,comp}