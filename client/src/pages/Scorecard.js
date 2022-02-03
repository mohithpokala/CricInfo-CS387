
import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import 'chart.js/auto';

import Link from '@mui/material/Link';
import '../CSS/Match.css'
import bat1 from '../Assets/bat1.png'
import bat2 from '../Assets/bat2.png'
import bat3 from '../Assets/bat3.png'
import bat4 from '../Assets/bat4.png'
import bat5 from '../Assets/bat5.jpg'
import bat6 from '../Assets/bat6.png'
import bowl1 from '../Assets/bowl1.png'
import bowl2 from '../Assets/bowl2.png'
import bowl3 from '../Assets/bowl3.png'
import bowl4 from '../Assets/bowl4.png'
import bowl5 from '../Assets/bowl5.png'
import bowl6 from '../Assets/bowl6.png'
import bowl7 from '../Assets/bowl6.png'
import Slideshow  from '../Components/Slideshow';
import srh from '../Assets/srh.png'
import csk from '../Assets/csk.png'
import kkr from '../Assets/kkr.png'
import kxip from '../Assets/kxip.png'
import pwi from '../Assets/pwi.png'
import mi from '../Assets/mi.png'
import gl from '../Assets/gl.png'
import rcb from '../Assets/rcb.png'
import ktk from '../Assets/ktk.png'
import dd from '../Assets/dd.png'
import dc from '../Assets/dc.png'
import rr from '../Assets/rr.png'
import rps from '../Assets/rpsg.png'
import download from '../Assets/download.jpg'
import '../CSS/rotateimage.css'

const Scorecard = (props) => {
  const L=[
    kkr,kkr,rcb,csk,kxip,rr,dd,mi,dc,ktk,pwi,srh,rps,gl
  ]
  const batim=[
    {im:bat1},
    {im:bat2},
    {im:bat3},
    {im:bat4},
    {im:bat5},
    {im:bat6}
  ]

  const bowlim=[
    {im:bowl1},
    {im:bowl2},
    {im:bowl3},
    {im:bowl4},
    {im:bowl5},
    {im:bowl6},
    {im:bowl7}
  ]
    const [innings1bat,setInnings1bat]=useState(false);
    const [innings1bowl,setInnings1bowl]=useState(false);
    const [innings2bat,setInnings2bat]=useState(false);
    const [innings2bowl,setInnings2bowl]=useState(false);  
    const [team1, setTeam1] =useState(false);
    const [team2, setTeam2]=useState(false);
    const [matchdet, setMatchdet]=useState(false);
    const [misc, setMisc] =useState(false);
    const [umpire, setUmpire]=useState(false);
    const [player, setPlayer]=useState(false);
    
    const match_id = props.match_id;

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecard/"+match_id+"/2/3")
                .then((res) => res.json())
                .then((json) => {
                setMatchdet(json);
                });
        }, 2000);
    }, []);

    useEffect(() => {
      setTimeout(() => {
          fetch("http://localhost:5000/scorecard/"+match_id+"/2/5")
              .then((res) => res.json())
              .then((json) => {
              setMisc(json);
              });
      }, 2000);
  }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!umpire)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/2/4")
                            .then((res) => res.json())
                            .then((json) => {
                               setUmpire(json);
                               ;
                            });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!team1)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/1/2")
                            .then((res) => res.json())
                            .then((json) => {
                               setTeam1(json);
                               ;
                            });
        }, 2000);
    }, []);
    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    useEffect(() => {
        setTimeout(() => {
            if(!team2)
            fetch(

            "http://localhost:5000/scorecard/"+match_id+"/2/2")
                        .then((res) => res.json())
                        .then((json) => {
                           setTeam2(json);
                        });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!innings1bat)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/1/0")
                            .then((res) => res.json())
                            .then((json) => {
                               setInnings1bat(json);
                               ;
                            });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!innings1bowl)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/1/1")
                            .then((res) => res.json())
                            .then((json) => {
                               setInnings1bowl(json);
                               ;
                            });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!innings2bat)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/2/0")
                            .then((res) => res.json())
                            .then((json) => {
                               setInnings2bat(json);
                               ;
                            });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!innings2bowl)
            fetch(
                "http://localhost:5000/scorecard/"+match_id+"/2/1")
                            .then((res) => res.json())
                            .then((json) => {
                               setInnings2bowl(json);
                            });
        }, 2000);
    }, []);
    
  console.log(matchdet);
  return (
    <>
      {!(innings1bat && misc && innings1bowl && innings2bat && innings2bowl && umpire && matchdet && team1 && team2) ? (
        <img className ="animate" src={download} style ={{left:"30%",top:"30%",position:"absolute",width:"40%",height:"40%"}}/>
      ) : (
        <React.Fragment>
      <h2 style={{textAlign:"center"}}>Match Info</h2>
      <img src={L[matchdet[0].team1]} style={{left:"38%",height:"20%",width:"9%",position:"absolute"}}/> <b style={{textAlign:"center",width:"100%",top:"15%",position:"absolute"}}> Vs </b>
      <img src={L[matchdet[0].team2]} style={{left:"52%",height:"20%",width:"9%",position:"absolute"}}/>
<br></br><br></br>
        <div style={{width:"100%",height:"90%",top:"40%",position:"absolute",textAlign:"center"}}>
      <b>{matchdet? "Match":''}</b><b>:</b>{matchdet?match_id+" ,  "+matchdet[0].team1name + " vs "+ matchdet[0].team2name + " ,"+ matchdet[0].season_year:''}
      <br/>
      <b>{matchdet? "Toss":''}</b><b>:</b>{matchdet?(((matchdet[0].team1==matchdet[0].toss_winner) && (matchdet[0].toss_name='bat')) ? matchdet[0].team1name : matchdet[0].team2name) +" has won the toss and chose to "+matchdet[0].toss_name+" first":''} 
      <br/>
      <b>{matchdet? "Venue":''}</b><b>:</b> {matchdet?matchdet[0].venue_name+" , "+matchdet[0].city_name:''} 
      <br/>
      <b>{matchdet? "Umpires":''}</b><b>:</b>
      {umpire?umpire[0].umpire_name+" , "+umpire[1].umpire_name+" , "+umpire[2].umpire_name:''}<br/><br/>
      <b>
        Playing XI:
      </b>
      <br></br>
      <b>{team1 && matchdet ? matchdet[0].team1name+" : ":''}</b> 
      {team1 && matchdet?team1[0].player_name+" , "+team1[1].player_name+" , "+team1[2].player_name+" , "+team1[3].player_name+" , "+team1[4].player_name+" , "+team1[5].player_name+" , "+team1[6].player_name+" , "+team1[7].player_name+" , "+team1[8].player_name+" , "+team1[9].player_name+" , "+team1[10].player_name:''}
      <br></br>
      
      <b>{team2 && matchdet ? matchdet[0].team2name+" : ":''}</b> 
      {team2 && matchdet?team2[0].player_name+" , "+team2[1].player_name+" , "+team2[2].player_name+" , "+team2[3].player_name+" , "+team2[4].player_name+" , "+team2[5].player_name+" , "+team2[6].player_name+" , "+team2[7].player_name+" , "+team2[8].player_name+" , "+team2[9].player_name+" , "+team2[10].player_name:''}
      <br/><br/>
      <h2 style={{textAlign:"center"}}>Scorecard</h2>

          <div style={{display:"block",width:"50%",position:"absolute"}}>
            <h5 style={{textAlign:"center"}}>
                First Innings:{matchdet[0].team1==matchdet[0].toss_winner ? matchdet[0].team1name : matchdet[0].team2name}
            </h5>
            <table>
            <tr>
              <td>Batter</td>
              <td>Runs</td>
              <td>Fours</td>
              <td>Sixes</td>
              <td>Balls Faced</td></tr>
              {
                innings1bat.map( 
                  x => { return <tr>
                  <td><Link href={"/players/"+x.player_id} style={{color:"black",textDecoration:"none"}}> {x.batter}</Link></td>
                  <td>{x.runs}</td>
                  <td>{x.fours}</td>
                  <td>{x.sixes}</td>
                <td>{x.balls_faced}</td>
          
          </tr>
          }
        )
      }
      </table>
      </div>
      <Slideshow img={batim} fade={true} width={"20%"} ml={"40%"} mt={"52%"} ht={"12%"} />
      <div style={{display:"block",width:"50%",position:"absolute",left:"50%"}}>
            <h5 style={{textAlign:"center"}}>
                Second Innings : {matchdet[0].team1!=matchdet[0].toss_winner ? matchdet[0].team1name : matchdet[0].team2name}
            </h5>
            <table>
            <tr>
              <td>Batter</td>
              <td>Runs</td>
              <td>Fours</td>
              <td>Sixes</td>
              <td>Balls Faced</td></tr>
              {
                innings2bat.map( 
                  x => { return <tr>
                  <td><Link href={"/players/"+x.player_id} style={{color:"black",textDecoration:"none"}}> {x.batter}</Link></td>
                  <td>{x.runs}</td>
                  <td>{x.fours}</td>
                  <td>{x.sixes}</td>
                <td>{x.balls_faced}</td>
          
          </tr>
          }
        )
      }
      </table>
      </div>
      <br></br>

      <div style={{display:"block",top:"118%",width:"50%",position:"absolute"}}>

            <table>
            <tr>
              <td >Bowler</td>
              <td>Balls Bowled</td>
              <td>Runs Given</td>
              <td>Wickets</td></tr>
              {
                range(0,10).map( 
                  x => { return ((innings1bowl.length>x)?(<tr>
                                      <td><Link href={"/players/"+innings1bowl[x].player_id} style={{color:"black",textDecoration:"none"}}> {innings1bowl[x].bowler}</Link></td>
                  <td>{innings1bowl[x].bowls_bowled}</td>
                  <td>{innings1bowl[x].runs_given}</td>
                  <td>{innings1bowl[x].wickets}</td></tr>):(<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td></tr>));
                  
          }          
        )
      }
      <tr><td>
        <b>Extras</b> </td><td>&nbsp;</td><td>&nbsp;</td><td>{misc[0].extra1} </td></tr>
      <tr><td><b>Total </b></td><td>&nbsp;</td><td>&nbsp;</td><td>{misc[0].total1}/{misc[0].wkts1} </td></tr>
      </table>
      </div>
      <Slideshow img={bowlim} fade={true}width={"20%"} ml={"40%"} mt={"112%"} ht={"10%"} />
      <div style={{display:"block",top:"118%",width:"50%",position:"absolute",left:"50%"}}>

            <table>
            <tr>
              <td>Bowler</td>
              <td>Balls Bowled</td>
              <td>Runs Given</td>
              <td>Wickets</td></tr>
              {
                range(0,10).map( 
                  x => { return ((innings2bowl.length>x)?(<tr>
                                      <td><Link href={"/players/"+innings2bowl[x].player_id} style={{color:"black",textDecoration:"none"}}> {innings2bowl[x].bowler}</Link></td>
                  <td>{innings2bowl[x].bowls_bowled}</td>
                  <td>{innings2bowl[x].runs_given}</td>
                  <td>{innings2bowl[x].wickets}</td></tr>):(<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td></tr>));
          
          }
        )
      }
      <tr><td>
        <b>Extras</b> </td><td>&nbsp;</td><td>&nbsp;</td><td>{misc[0].extra2} </td></tr>
      <tr><td><b>Total </b></td><td>&nbsp;</td><td>&nbsp;</td><td>{misc[0].total2}/{misc[0].wkts2} </td></tr>
      </table>
      </div>

      <h3 style={{display:"block",top:"200%",width:"100%",position:"absolute",textAlign:"center"}}>          {matchdet[0].match_winner==matchdet[0].team1?matchdet[0].team1name:matchdet[0].team2name} won by {matchdet[0].win_margin} {matchdet[0].win_type}
</h3></div>
    </React.Fragment>
      )}
    </>

  );
}

export default Scorecard;