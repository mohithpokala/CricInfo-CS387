const {venue,venue_Id,venueb_Id,venuec_Id} = require("../Services/E.services");

const Venue = async (req,res) => {
    const data = await venue();
    return res.status(200).json(data);
}

const Venue_id = async (req,res) => {
    const venue_id = req.params.venue_id;
    const data = await venue_Id(venue_id);
    return res.status(200).json(data);
}

const Venueb_id = async (req,res) => {
    const venue_id = req.params.venue_id;
    const data = await venueb_Id(venue_id);
    return res.status(200).json(data);
}

const Venuec_id = async (req,res) => {
    const venue_id = req.params.venue_id;
    const data = await venuec_Id(venue_id);
    return res.status(200).json(data);
}

module.exports = {Venue,Venue_id,Venueb_id,Venuec_id}