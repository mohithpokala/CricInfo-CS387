const {best_bowler,best_batsman} = require("../Services/B4.services");

const top3batsman = async (req,res) => {
    const innings_number = req.params.innings_number;
    const match_id = req.params.match_id;
    const data = await best_batsman(match_id,innings_number);
    return res.status(200).json(data);
}

const top3bowlers = async (req,res) => {
    const innings_number = req.params.innings_number;
    const match_id = req.params.match_id;
    const data = await best_bowler(match_id,innings_number);
    return res.status(200).json(data);
}

module.exports = {top3batsman,top3bowlers}
