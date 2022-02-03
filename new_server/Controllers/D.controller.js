const {points_table,syear} = require("../Services/D.services");

const pointstable = async (req,res) => {
    const year = req.params.year;
    const data = await points_table(year);
    return res.status(200).json(data);
}

const sy = async (req,res) => {
    const data = await syear();
    return res.status(200).json(data);
}


module.exports = {pointstable,sy}