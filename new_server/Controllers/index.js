const {bat_stats,bowl_stats,misc_info,umpire_info,player_info,summary} = require('./scoreboard.controller');
const {matches_info,match_info}=require('./matches.contoller');
const {comp} = require('./scorecomparison.controller');
module.exports= {bat_stats,bowl_stats,misc_info,umpire_info,player_info,summary,matches_info,match_info,comp}