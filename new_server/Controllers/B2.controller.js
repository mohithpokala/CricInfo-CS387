const {scorecard_info} = require('../Services/B2.services.js');

const scorecard_data = async (req,res) => {
    const arg1 = req.params.arg1;
    const arg2 = req.params.arg2;
    const arg3 = req.params.arg3;
    const data = await scorecard_info(arg1,arg2,arg3);
    console.log(data);
    return res.status(200).json(data);
}

module.exports= {scorecard_data}