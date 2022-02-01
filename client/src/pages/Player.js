import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Typography from '@mui/material/Typography';

const Player = () => {

    const player_id=useParams().player_id;
    const [player, setPlayer]=useState([false]);
  
    const [playerbat, setPlayerbat]=useState([false]);
    const [playerbowl, setPlayerbowl]=useState([false]);
    

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
        
      fetch(
        "http://localhost:5000/players/"+player_id+"/3")
                    .then((res) => res.json())
                    .then((json) => {
                       setPlayerbat(json);
                       console.log(json);
                    });
    fetch(
        "http://localhost:5000/players/"+player_id+"/2")
                    .then((res) => res.json())
                    .then((json) => {
                       setPlayerbowl(json);
                       console.log(json);
                    });
      

                   


    }


    return <React.Fragment>
    <h1>{player?player[0].player_name+","+player[0].country_name:""}</h1>
        <h2>Batting Style:{player?player[0].batting_hand:""}</h2>
        <h2>Bowling Style:{player?player[0].bowling_skill:""}</h2>
    <h3>Batting Career:</h3>
    <h4>Number of Innings Played:{playerbat[0].number_of_matches_played}</h4>
    <h4>Runs:{playerbat[0].total_runs}</h4>
    <h4>Fours:{playerbat[0].four}</h4>
    <h4>Sixes:{playerbat[0].six}</h4>
    <h4>Fifties:{playerbat[0].num_fifty}</h4>
    <h4>Highest Score:{playerbat[0].hs}</h4>
    <h4>Average:{playerbat[0].average}</h4>

    
    <h3>Bowling Career:</h3>
    <h4>Number of Innings Bowled:{playerbowl[0].num_matches}</h4>
    <h4>Runs Given:{playerbowl[0].runs_given}</h4>
    <h4>Number of wickets:{playerbowl[0].num_wkts}</h4>
    <h4>Overs:{playerbowl[0].overs}</h4>
    <h4>Number of balls bowled:{playerbowl[0].balls}</h4>
    <h4>Economy:{playerbowl[0].economy}</h4>
    <h4>Number of Fifers:{playerbowl[0].five_wkts}</h4>
     
    </React.Fragment>
    ;
  };
  
  export default Player;
