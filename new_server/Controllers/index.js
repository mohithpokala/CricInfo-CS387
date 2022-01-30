const {bat_stats,bowl_stats,misc_info,umpire_info,player_info,summary} = require('./scoreboard.controller');
const {matches_info,match_info}=require('./matches.contoller');
const {comp} = require('./scorecomparison.controller');
const {top3bowlers,top3batsman} = require('./B4.controller');
const {player_full_info} = require('./C.controller');
module.exports= {player_full_info,top3batsman,top3bowlers,bat_stats,bowl_stats,misc_info,umpire_info,player_info,summary,matches_info,match_info,comp}