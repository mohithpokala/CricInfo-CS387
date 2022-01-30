const {sc} = require("../Models/B3.models")

const compare = async(match_id,innings_number)=>{
    const data = await sc(match_id,innings_number);
    return data
}

module.exports = {compare};