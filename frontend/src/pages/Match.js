import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Typography from '@mui/material/Typography';

const Match = () => {

  const [innings1bat,setInnings1bat]=useState([]);
  const [innings1bowl,setInnings1bowl]=useState([]);
  const [innings2bat,setInnings2bat]=useState([]);
  const [innings2bowl,setInnings2bowl]=useState([]);

  
  const [team1, setTeam1] =useState(false);
  const [team2, setTeam2]=useState(false);
  const [matchdet, setMatchdet]=useState(false);

  const [misc, setMisc] =useState([]);
  const [umpire, setUmpire]=useState(false);
  const [player, setPlayer]=useState([]);
  

  const match_id=useParams().match_id;
  useEffect(()=>{
    getMatchinfo();},[]);


    function getMatchinfo()
    {

      fetch(
        "http://localhost:5000/scorecard/"+match_id+"/2/3")
                    .then((res) => res.json())
                    .then((json) => {
                       setMatchdet(json);
                       console.log(json);
                    });


                  fetch(
                      "http://localhost:5000/scorecard/"+match_id+"/2/4")
                                  .then((res) => res.json())
                                  .then((json) => {
                                     setUmpire(json);
                                     console.log(json);
                                  });
    

                                  fetch(
                                    "http://localhost:5000/scorecard/"+match_id+"/1/2")
                                                .then((res) => res.json())
                                                .then((json) => {
                                                   setTeam1(json);
                                                   console.log(json);
                                                });

      
                                                fetch(
                                                  "http://localhost:5000/scorecard/"+match_id+"/2/2")
                                                              .then((res) => res.json())
                                                              .then((json) => {
                                                                 setTeam2(json);
                                                                 console.log(json);
                                                              });

              
      fetch(
        "http://localhost:5000/scorecard/"+match_id+"/1/0")
                    .then((res) => res.json())
                    .then((json) => {
                       setInnings1bat(json);
                       console.log(json);
                    });
      
      fetch(
        "http://localhost:5000/scorecard/"+match_id+"/1/1")
                    .then((res) => res.json())
                    .then((json) => {
                       setInnings1bowl(json);
                       console.log(json);
                    });

        
      fetch(
        "http://localhost:5000/scorecard/"+match_id+"/2/0")
                    .then((res) => res.json())
                    .then((json) => {
                       setInnings2bat(json);
                       console.log(json);
                    });
      
      fetch(
        "http://localhost:5000/scorecard/"+match_id+"/2/1")
                    .then((res) => res.json())
                    .then((json) => {
                       setInnings2bowl(json);
                       console.log(json);
                    });
      

                   


    }


    return <React.Fragment>
      <Typography variant="h3" component="div" gutterBottom>
        Scorecard
      </Typography>
    
      <Typography variant="h4" component="div" gutterBottom>
       {matchdet?"Match ID:"+match_id+","+matchdet[0].team1+" vs "+matchdet[0].team2+","+matchdet[0].season_year:''}
      </Typography>

      
      <Typography variant="h5" component="div" gutterBottom>
       {matchdet?matchdet[0].venue_name+":"+matchdet[0].team_name+" won the toss and chose to "+matchdet[0].toss_name:''}
      </Typography>

      


      
      
      
      <Typography variant="h6" component="div" gutterBottom>
        {umpire?"Umpires:"+umpire[0].umpire_name+","+umpire[1].umpire_name+","+umpire[2].umpire_name:''}
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        Playing XI:
      </Typography>
      
      <Typography variant="h6" component="div" gutterBottom>
        {team1 && matchdet?matchdet[0].team1+":"+team1[0].player_name+","+team1[1].player_name+","+team1[2].player_name+","+team1[3].player_name+","+team1[4].player_name+","+team1[5].player_name+","+team1[6].player_name+","+team1[7].player_name+","+team1[8].player_name+","+team1[9].player_name+","+team1[10].player_name:''}
      </Typography>

      
      <Typography variant="h6" component="div" gutterBottom>
        {team2 && matchdet?matchdet[0].team2+":"+team2[0].player_name+","+team2[1].player_name+","+team2[2].player_name+","+team2[3].player_name+","+team2[4].player_name+","+team2[5].player_name+","+team2[6].player_name+","+team2[7].player_name+","+team2[8].player_name+","+team2[9].player_name+","+team2[10].player_name:''}
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        First Innings
      </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Batter</TableCell>
          <TableCell>Runs</TableCell>
          <TableCell>Fours</TableCell>
          <TableCell>Sixes</TableCell>
          <TableCell>Balls Faced</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      {
      innings1bat.map( 
        x => { return <TableRow>
          <TableCell>{x.batter}</TableCell>
          <TableCell>{x.runs}</TableCell>
          <TableCell>{x.fours}</TableCell>
          <TableCell>{x.sixes}</TableCell>
          <TableCell>{x.balls_faced}</TableCell>
          
          </TableRow>
          }
        )
      }
      </TableBody>
    </Table>

    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Bowler</TableCell>
          <TableCell>Balls Bowled</TableCell>
          <TableCell>Runs Given</TableCell>
          <TableCell>Wickets</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      {
      innings1bowl.map( 
        x => { return <TableRow>
          <TableCell>{x.bowler}</TableCell>
          <TableCell>{x.bowls_bowled}</TableCell>
          <TableCell>{x.runs_given}</TableCell>
          <TableCell>{x.wickets}</TableCell>
          
          </TableRow>
          }
        )
      }
      </TableBody>
    </Table>
    
    <Typography variant="h5" component="div" gutterBottom>
        Second Innings
      </Typography>

      <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Batter</TableCell>
          <TableCell>Runs</TableCell>
          <TableCell>Fours</TableCell>
          <TableCell>Sixes</TableCell>
          <TableCell>Balls Faced</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      {
      innings2bat.map( 
        x => { return <TableRow>
          <TableCell>{x.batter}</TableCell>
          <TableCell>{x.runs}</TableCell>
          <TableCell>{x.fours}</TableCell>
          <TableCell>{x.sixes}</TableCell>
          <TableCell>{x.balls_faced}</TableCell>
          
          </TableRow>
          }
        )
      }
      </TableBody>
    </Table>

    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Bowler</TableCell>
          <TableCell>Balls Bowled</TableCell>
          <TableCell>Runs Given</TableCell>
          <TableCell>Wickets</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      {
      innings2bowl.map( 
        x => { return <TableRow>
          <TableCell>{x.bowler}</TableCell>
          <TableCell>{x.bowls_bowled}</TableCell>
          <TableCell>{x.runs_given}</TableCell>
          <TableCell>{x.wickets}</TableCell>
          
          </TableRow>
          }
        )
      }
      </TableBody>
    </Table>

    </React.Fragment>
    ;
  };
  
  export default Match;