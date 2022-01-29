const {scorecard_batting,scorecard_bowling,scorecard_misc,scorecard_umpires,scorecard_playingXI,scorecard_summary} = require('../Services/scorecard.services.js');

const bat_stats = async (req,res) => {
    const match_id = req.params.match_id;
    const innings_number = req.params.innings_number;
    const batting_stats = await scorecard_batting(match_id,innings_number);
    console.log(batting_stats);
    return res.status(200).json(batting_stats);
}

const bowl_stats = async (req,res) => {
    const match_id = req.params.match_id;
    const innings_number = req.params.innings_number;
    const bowling_stats = await scorecard_bowling(match_id,innings_number);
    return res.status(200).json(bowling_stats);
}

const misc_info = async (req,res) => {
    const match_id = req.params.match_id;
    const misc_data = await scorecard_misc(match_id);
    return res.status(200).json(misc_data);
}

const umpire_info = async (req,res) => {
    const match_id = req.params.match_id;
    const data = await scorecard_umpires(match_id);
    return res.status(200).json(data);
}

const player_info = async (req,res) => {
    const match_id = req.params.match_id;
    const team_number = req.params.team_number;
    const data = await scorecard_playingXI(match_id,team_number);
    return res.status(200).json(data);
}


const summary = async (req,res) => {
    const match_id = req.params.match_id;
    const data = await scorecard_summary(match_id);
    return res.status(200).json(data);
}

module.exports= {bat_stats,bowl_stats,misc_info,umpire_info,player_info,summary}