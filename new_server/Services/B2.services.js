const {bats_stats,bowl_stats,player_info1,umpire_info,player_info2,match_info,summary} = require('../Models/B2.models');

const scorecard_info = async(arg1,arg2,arg3)=>{
    const data="dummy;"
    switch(arg3){
        case "0": data = await bats_stats(arg1,arg2);break;
        case "1": data = await bowl_stats(arg1,arg2);break;
        case "2": if(arg2=="1") data = await player_info1(arg1); else data = await player_info2(arg1);break;
        case "3": data = await match_info(arg1);break;
        case "4": data = await umpire_info(arg1);break;
        case "5": data = await summary(arg1);break;
    }
    const data = await sb(match_id,innings_number);
    return data
}
module.exports = {scorecard_info}
