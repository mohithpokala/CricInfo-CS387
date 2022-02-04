import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

const Player_info=()=>{

    const player_id=useParams().player_id;
    const [player, setPlayer]=useState([false]);
  

    useEffect(()=>{
        getPlayerinfo();},[]);
    
    
        function getPlayerinfo()
        {
    
          fetch(
            "http://localhost:5000/players/"+player_id+"/4")
                        .then((res) => res.json())
                        .then((json) => {
                           setPlayer(json);
                           console.log(json);
                        });
        }

    return <React.Fragment>
        <div style={{width:"100%",height:"90%",top:"40%",position:"absolute",textAlign:"center"}}>
    <h1>{player[0]?player[0].player_name+","+player[0].country_name:""}</h1>
        <h2>{player[0]?player[0].batting_hand+"sman":""}</h2>
        <h2>{player[0]?(player[0].bowling_skill=="N/A")?(""):player[0].bowling_skill+" bowler":""}</h2>
        </div>
     
    </React.Fragment>
    ;

};

export default Player_info;