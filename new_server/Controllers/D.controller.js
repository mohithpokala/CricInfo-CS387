const {points_table} = require("../Services/D.services");

const pointstable = async (req,res) => {
    const year = req.params.year;
    const data = await points_table(year);
    return res.status(200).json(data);
}

module.exports = {pointstable}