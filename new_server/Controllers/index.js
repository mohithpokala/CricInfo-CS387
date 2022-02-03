const {scorecard_data} = require('./B2.controller');
const {matches_info,match_info}=require('./B1.controller');
const {comp} = require('./B3.controller');
const {top3bowlers,top3batsman,piechart} = require('./B4.controller');
const {player_full_info} = require('./C.controller');
const {pointstable,sy} = require('./D.controller');
const {Venue,Venue_id,Venueb_id,Venuec_id} =require('./E.controller');
module.exports= {sy,piechart,player_full_info,top3batsman,top3bowlers,scorecard_data,matches_info,match_info,comp,pointstable,Venue,Venue_id,Venueb_id,Venuec_id}