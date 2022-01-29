const {mf,mfi} = require('../Models/matches.models');

const matches_info_func = async(skip,limit)=>{
    const data = await mf(skip,limit);
    return data
}

const match_info_func = async(match_id)=>{
    const data = await mfi(match_id);
    return data
}

module.exports = {matches_info_func,match_info_func}
