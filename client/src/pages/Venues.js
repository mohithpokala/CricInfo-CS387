import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";

import Link from '@mui/material/Link';

const Venues =()=>{
    const [venues,setVenues] = useState(false);
    const venue_id=useParams().venue_id;

    
    useEffect(() => {
        setTimeout(() => {
            fetch(
                "http://localhost:5000/venue/")
                            .then((res) => res.json())
                            .then((json) => {
                               setVenues(json);
                            });
        }, 2000);
    }, []);

    return (<>
        {!(venues) ? (
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
         <div style={{position:"absolute",width:"100%",top:"5%",left:"0%",height:"100%",textAlign:"left"}}>
             <table style={{width:"70%",position:"absolute",left:"15%"}}>
             <tr>
                 <td style={{textAlign:"left"}}><b>Venue</b></td>
                 <td style={{textAlign:"center"}}><b>City</b></td>
                 <td style={{textAlign:"left"}}><b>Country</b></td>
                 <td style={{textAlign:"center"}}><b>Capacity</b></td>
                 <td style={{textAlign:"center"}}><b>Number of matches</b></td>
               </tr>
               {venues.map((row) => (
                 <tr key={row.venue_id}>
                 <td  style={{textAlign:"left"}}><b><Link href={"/venue/"+row.venue_id} style={{color:"black",textDecoration:"none"}}>{row.venue_name}</Link></b></td>
                   <td  style={{textAlign:"center"}}>{row.city_name}</td>
                   <td  style={{textAlign:"center"}}>{row.country_name}</td>
                   <td  style={{textAlign:"center"}}>{row.capacity}</td>
                   <td  style={{textAlign:"center"}}>{row.matches}</td>
                 </tr>
               ))}
             </table>
         </div></React.Fragment>)}</>
       );

};

export default Venues;