const {venues,Venue_Id,Venueb_Id,Venuec_Id}= require("../Models/E.models")

const venue = async()=>{
    
    const data = await venues();
    return data
}

const  venue_Id= async(venue_id)=>{
    
    const data = await Venue_Id(venue_id);
    return data
}
const  venueb_Id= async(venue_id)=>{
    
    const data = await Venueb_Id(venue_id);
    return data
}
const  venuec_Id= async(venue_id)=>{
    
    const data = await Venuec_Id(venue_id);
    return data
}

module.exports = {venue,venue_Id,venueb_Id,venuec_Id};
