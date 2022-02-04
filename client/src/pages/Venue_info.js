import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";

const Venue_info=()=>{

    const venue_id=useParams().venue_id;
    const [venue, setVenue]=useState(false);
  
    useEffect(() => {
        setTimeout(() => {
    
        fetch(
            "http://localhost:5000/venue/"+venue_id)
                        .then((res) => res.json())
                        .then((json) => {
                           setVenue(json);
                           console.log(json);
                        });
        }, 2000);
      }, []);   
    


      return (<>
        {!(venue) ? (
             <div
             style={{
                 position: 'absolute', left: '50%', top: '60%',
                 transform: 'translate(-50%, -50%)'
             }}
             ><ReactLoading
               
               type={"bubbles"}
               color={"orange"}
               height={100}
               width={100}
             /></div>
           ) : (
            <React.Fragment>
            <div style={{width:"100%",height:"90%",top:"40%",position:"absolute",textAlign:"center"}}>
        <h1>{venue?venue[0].venue_name+","+venue[0].city_name:""}</h1>
            <h2>{venue?"Capacity:"+venue[0].capacity:""}</h2>      
            <h2>{venue?"Matches played:"+venue[0].matches:""}</h2>      
            <h2>{venue?"Maximum Score:"+venue[0].max_scores:""}</h2>
            <h2>{venue?"Maximum Score Chased:"+venue[0].chase:""}</h2>
            <h2>{venue?"Minimum Score:"+venue[0].min_scores:""}</h2>
            </div>
         
        </React.Fragment>
         )}</>
       );



};

export default Venue_info;