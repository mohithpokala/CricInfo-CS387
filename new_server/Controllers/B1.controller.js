const {matches_info_func,match_info_func} = require('../Services/B1.services.js');


const matches_info = async (req,res) => {
    if(!req.query.skip) {skip=0;}
    else {skip=req.query.skip;}
    if(!req.query.limit) {limit=5;}
    else {limit=req.query.limit;}
    const data = await matches_info_func(skip,limit);
    return res.status(200).json(data);
}

const match_info = async(req,res)=>
{
    const match_id = req.params.match_id;
    const data = await match_info_func(match_id);
    return res.status(200).json(data);

}


module.exports= {matches_info,match_info}