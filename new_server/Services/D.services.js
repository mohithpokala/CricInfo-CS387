const {pointsTable,syears}= require("../Models/D.models")

const points_table = async(year)=>{
    
    const data = await pointsTable(year);
    return data
}

const syear = async()=>{
    const data = await syears();
    return data;
}
module.exports = {points_table,syear};
