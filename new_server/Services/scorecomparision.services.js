const sc = require("../Models/scorecomparision.models")

const score_compare = async(match_id,innings_number)=>{
    const data = await sc(match_id,innings_number);
    return data
}

module.exports = {score_compare};