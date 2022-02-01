import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
const Card_comp = (prop) => {

    const [color,setColor]=useState(["purple","crimson","yellow","firebrick","indigo","blue","dodgerBlue","grey","lightSalmon","black","orange","violet","orangeRed"]);
    console.log(color[prop.data.match_winner-1]);
    console.log(prop.data.match_winner,prop.data.winner);
    console.log(color[parseInt(prop.data.match_winner)]);

    return(
    <Link href={"/matches/"+prop.data.match_id} style={{textDecoration:"none"}}>
      <Card key={prop.index} className="box" >
        <div style={{display:"block",opacity:0.9,width:"100%",height:"10vh",borderRadius:"4px",backgroundColor:color[parseInt(prop.data.match_winner)-1]}}></div>
        <Card.Body className='boxheader'>
          <Card.Title classname="tit" >{prop.data.team1} vs {prop.data.team2}</Card.Title>
          <Card.Text classname="venue" >{prop.data.venue_name},{prop.data.city_name}</Card.Text>
          {prop.data.winner+" won by "+prop.data.win_margin+" "+prop.data.win_type}
        </Card.Body>
     </Card>
     </Link>
    )
  };
  


  export default Card_comp;
  
  
  