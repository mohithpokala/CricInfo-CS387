const {all_batting,all_bowling,all_players,all_countries,player_bio,player_score_bat,player_bowl,player_bat,player_score_bowl}= require("../Models/C.models")

const player_description = async(player_id,type)=>{
    var data="";
    switch(type){
        case "0":   data = await player_score_bat(player_id);break;
        case "1":   data = await player_score_bowl(player_id);break;
        case "2":   data = await player_bowl(player_id);break;
        case "3":   data = await player_bat(player_id);break;
        case "4":   data = await player_bio(player_id);break;
        case "5":   data = await all_batting(player_id);break;
        case "6":   data = await all_bowling(player_id);break;
        case "7":   data = await all_countries(player_id);break;
        case "8":   data = await all_players(player_id);break;
    }
    return data
}

module.exports = {player_description};
