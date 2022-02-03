const {tbat,tbowl,pieChart} = require("../Models/B4.models")

const best_batsman = async(match_id,innings_number)=>{
    const data = await tbat(match_id,innings_number);
    return data
}

const best_bowler = async(match_id,innings_number)=>{
    const data = await tbowl(match_id,innings_number);
    return data
}


const PieChart = async(match_id,innings_number)=>{
    const data = await pieChart(match_id,innings_number);
    return data
}

module.exports = {best_batsman,best_bowler,PieChart};
