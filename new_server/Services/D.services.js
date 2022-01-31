const {pointsTable}= require("../Models/D.models")

const points_table = async(year)=>{
    
    const data = await pointsTable(year);
    return data
}

module.exports = {points_table};
