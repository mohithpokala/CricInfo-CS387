import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Player_info from './Player_info';
import Player_bat from './Player_bat';
import Player_bowl from './Player_bowl';


import Typography from '@mui/material/Typography';

const Player = () => {


  const player_id=useParams().player_id;
  const [x,setX]= useState(0);
  const f0=()=>{
      setX(0);
  }
  const f1=()=>{
      setX(1);
  }
  const f2=()=>{
      setX(2);
  }
  return (
  <div className="home_page">
    <div className='navbar' style={{width:"30%",height:"8%",top:"0%",left:"45%"}}>
      <ul>
          <li onClick={f0} style={{backgroundColor:x==0?"green":"#333",color:"white"}}><a >Information</a></li>
          <li onClick={f1} style={{backgroundColor:x==1?"green":"#333",color:"white"}}><a >Batting</a></li>
          <li onClick={f2} style={{backgroundColor:x==2?"green":"#333",color:"white"}}><a >Bowling</a></li>
      </ul>
    </div>
      {
          (x==0)
          ?
          (<Player_info player_id={player_id}/>)
          :
          (
              (x==1)
              ?
              (<Player_bat player_id={player_id}/>)
              :
              (<Player_bowl player_id={player_id}/>)
          )
      }
  </div>
  );
  };
  
  export default Player;
