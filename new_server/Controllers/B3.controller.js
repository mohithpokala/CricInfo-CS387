const {compare} = require("../Services/B3.services");
console.log(compare);
const comp = async (req,res) => {
    const innings_number = req.params.innings_number;
    const match_id = req.params.match_id;
    console.log(match_id,innings_number);
    const data = await compare(match_id,innings_number);
    return res.status(200).json(data);
}

module.exports = {comp}