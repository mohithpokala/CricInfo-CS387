const {player_description} = require("../Services/C.services");

const player_full_info = async (req,res) => {
    const player_id = req.params.player_id;
    const type = req.params.type;
    const data = await player_description(player_id,type);
    return res.status(200).json(data);
}

module.exports = {player_full_info}