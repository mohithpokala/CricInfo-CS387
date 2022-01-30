const score_compare = require("../Services/B3.services");

const comp = async (req,res) => {
    const innings_number = req.params.innings_number;
    const match_id = req.params.match_id;
    const data = await score_compare(match_id,innings_number);
    return res.status(200).json(data);
}

module.exports = {comp}