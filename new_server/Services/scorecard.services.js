const {sb,sbo,sm,su,sp,ss} = require('../Models/scorecard.models');
const scorecard_batting = async(match_id,innings_number)=>{
    const data = await sb(match_id,innings_number);
    return data
}
const scorecard_bowling = async(match_id,innings_number)=>{
    const data = await sbo(match_id,innings_number);
    return data
}
const scorecard_misc = async(match_id)=>{
    const data = await sm(match_id);
    return data
}
const scorecard_umpires = async(match_id)=>{
    const data = await su(match_id);
    return data
}
const scorecard_playingXI = async(match_id,team_number)=>{
    const data = await sp(match_id,team_number);
    return data
}
const scorecard_summary = async(match_id)=>{
    const data = await ss(match_id);
    return data
}

module.exports = {scorecard_batting,scorecard_bowling,scorecard_misc,scorecard_umpires,scorecard_playingXI,scorecard_summary}
