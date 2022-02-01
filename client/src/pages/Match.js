
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

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

const Match = () => {

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
    const match_id=useParams().match_id;
    const [x,setX] = useState(0);
    const [y1,setY1] = useState([]);
    const [y2,setY2] = useState([]);
    const [y3,setY3] = useState([]);
    const [y4,setY4] = useState([]);

    const [chartData, setChartData] = useState({});
    const [done, setdone] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecard/"+match_id+"/2/3")
                .then((res) => res.json())
                .then((json) => {
                setMatchdet(json);
                setX(x+1);
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
                               setX(x+1);
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
                               setX(x+1);
                            });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(!team2)
            fetch(

            "http://localhost:5000/scorecard/"+match_id+"/2/2")
                        .then((res) => res.json())
                        .then((json) => {
                           setTeam2(json);
                           setX(x+1);
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
                               setX(x+1);
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
                               setX(x+1);
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
                               setX(x+1);
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
                               setX(x+1);
                            });
        }, 2000);
    }, []);
    useEffect(() => {
      setTimeout(() => {
          const p=matchdet?matchdet[0].team1name:'dummy';
          const q=matchdet?matchdet[0].team2name:'dummy';
          let runs1 = [];
          let runs2 = [];
          let wkts1 = [];
          let wkts2 = [];
          fetch("http://localhost:5000/scorecomparision/"+match_id+"/2")
              .then((res) => res.json())
              .then((json) => {
                  for(var i=0;i<json.length;i++){
                      runs1.push(json[i]['r1']);
                      if(json[i]['w1']==1)
                        wkts1.push({x:i+1,y:json[i]['r1']});
                      else if(json[i]['r1']>1){
                        for(var j=0;j<json[i]['w1'];j++){
                          var k=Math.random();console.log(k,k*0.1,json[i]['r1'],"rnadf");
                          wkts1.push({x:i+1,y:(parseInt(json[i]['r1'])+parseFloat((j-json[i]['w1']/2)*(json[i]['w1'])))});
                        }
                      }
  
                      runs2.push(json[i]['r2']);
                      if(json[i]['w2']==1)
                        wkts2.push({x:i+1,y:json[i]['r2']});
                      else if(json[i]['r2']>1){
                        for(var j=0;j<json[i]['w2'];j++){
                          var k=Math.random();console.log(k,k*0.1,json[i]['r2'],"rnadf");
                          wkts2.push({x:i+1,y:(parseInt(json[i]['r2'])+parseFloat((j-json[i]['w2']/2)*(json[i]['w2'])))});
                        }
                      }
                    }

                setY1(runs1);
                setY2(runs2);
                setY3(wkts1);
                setY4(wkts2);
                setChartData({
                  labels: range(1,20),
                  datasets: [
                    {
                      type :"line",
                      label: p,
                      data: runs1,
                      borderWidth: 4,
                      pointRadius:0,
                      borderColor:'rgba(255, 0, 0, 1)'
                    },
                    {
                      type :"scatter",
                      label: "level of thiccness",
                      data: wkts1,
                      borderWidth: 4,
                      pointRadius:3,
                      backgroundColor: "fillPattern",
                      color:"red",
                      borderColor:'rgba(0, 0, 0, 1)'

                    },
                    {
                      type :"line",
                      label: q,
                      data: runs2,
                      borderWidth: 4,
                      pointRadius:0,
                      borderColor:'rgba(0, 0, 255, 1)'

                    },
                    {
                      type :"scatter",
                      label: "level of thiccness",
                      data: wkts2,
                      borderWidth: 3,
                      pointRadius:3,
                      borderColor:'rgba(255,0,255, 1)',
                      backgroundColor: "fillPattern"
                    }
                  ],
                  options:{ maintainAspectRatio: false }
                });
                setdone(true);
              });            
      }, 2000);
  }, []);

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  console.log(misc);
  return (
    <>
      {!(innings1bat && misc && innings1bowl && innings2bat && innings2bowl && umpire && matchdet && team1 && team2 && done) ? (
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        ><ReactLoading
          
          type={"cylon"}
          color={"#03fc4e"}
          height={100}
          width={100}
        /></div>
      ) : (
        <React.Fragment>
      <h2 style={{textAlign:"center"}}>Match Info</h2>
      <b>{matchdet? "Match":''}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>:</b>{matchdet?match_id+" ,  "+matchdet[0].team1name + " vs "+ matchdet[0].team2name + " ,"+ matchdet[0].season_year:''}
      <br/>
      <b>{matchdet? "Toss":''}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>:</b>{matchdet?(matchdet[0].team1==matchdet[0].toss_winner ? matchdet[0].team1name : matchdet[0].team2name) +" has won the toss and chose to "+matchdet[0].toss_name+" first":''} 
      <br/>
      <b>{matchdet? "Venue":''}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>:</b> {matchdet?matchdet[0].venue_name+" , "+matchdet[0].city_name:''} 
      <br/>
      <b>{matchdet? "Umpires":''}</b> &nbsp;&nbsp;<b>:</b>
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
      <h4 style={{textAlign:"center"}}>Batting</h4>

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
                  <td><Link href={"/players/"+x.player_id}> {x.batter}</Link></td>
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
      <Slideshow img={batim} fade={true} width={"24%"} ml={"38%"} mt={"58%"} ht={"40vh"} />
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
                  <td><Link href={"/players/"+x.player_id}> {x.batter}</Link></td>
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
      <h4 style={{display:"block",top:"130%",position:"absolute",textAlign:"center",width:"100%"}}>Bowling</h4>

      <div style={{display:"block",top:"140%",width:"50%",position:"absolute",height:"80%"}}>

            <table>
            <tr>
              <td >Bowler</td>
              <td>Bowled</td>
              <td>Runs Given</td>
              <td>Wickets</td></tr>
              {
                innings1bowl.map( 
                  x => { return <tr>
                  <td><Link href={"/players/"+x.player_id}> {x.bowler}</Link></td>
                  <td>{x.bowls_bowled}</td>
                  <td>{x.runs_given}</td>
                  <td>{x.wickets}</td>
          
              </tr>
          }
        )
      }
      </table>
      </div>
      <Slideshow img={bowlim} fade={true} width="24%" ml="38%" mt="140%" ht="30vh" />
      <div style={{display:"block",top:"140%",width:"50%",position:"absolute",left:"50%"}}>

            <table>
            <tr>
              <td>Bowler</td>
              <td>Bowled</td>
              <td>Runs Given</td>
              <td>Wickets</td></tr>
              {
                innings2bowl.map( 
                  x => { return <tr>
                  <td><Link href={"/players/"+x.player_id}> {x.bowler}</Link></td>
                  <td>{x.bowls_bowled}</td>
                  <td>{x.runs_given}</td>
                  <td>{x.wickets}</td>
          
          </tr>
          }
        )
      }
      </table>
      
      </div>

      <div style={{display:"block",top:"175%",width:"50%",position:"absolute",left:"20%"}}>
        <br></br>
      <h5><b>Extra runs :{misc[0].extra1} </b></h5>
      <h5><b>Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:{misc[0].total1}/{misc[0].wkts1} </b></h5>
      </div>
      <div style={{display:"block",top:"175%",width:"20%",position:"absolute",left:"70%"}}><br></br>
      <h5><b>Extra runs :{misc[0].extra2} </b></h5>
      <h5><b>Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</b>{misc[0].total2}/{misc[0].wkts2} </h5>
      </div>
      <br></br><br></br><br></br>
      <h4 style={{display:"block",top:"190%",position:"absolute",textAlign:"center",width:"100%"}}>Score Comparision</h4>

      <div style={{position:"absolute",width:"50%",height:"20%",top:"200%",float:"center",left:"25%"}}>
          <Chart 
          data={{
            labels : range(1,20),
            datasets: [
              {
                type :"line",
                label: matchdet[0].team1name,
                data: y1,
                borderWidth: 2,
                pointRadius:0.5,
                borderColor:'rgba(255, 0, 0, 1)'
              },
              {
                type :"scatter",
                label: "Fall of wickets for "+matchdet[0].team1name,
                data: y3,
                borderWidth: 2,
                pointRadius:4,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                color:"red",
                borderColor:'rgba(0, 0, 0, 1)'

              },
              {
                type :"line",
                label: matchdet[0].team2name,
                data: y2,
                borderWidth: 2,
                pointRadius:0.5,
                borderColor:'rgba(0, 0, 255, 1)'

              },
              {
                type :"scatter",
                label: "Fall of wickets for "+matchdet[0].team2name,
                data: y4,
                borderWidth: 2,
                pointRadius:4,
                borderColor:'rgba(255,0,255, 1)',
                backgroundColor: 'rgba(255,0,255, 1)'
              }
            ],
            options:{ maintainAspectRatio: false }
          }} height="10px" width="20px" position="relative" options={{plugins: {
            title: {
                display: true,
                text: 'Runs scored Vs Over id',
                color:'red',
                font:'bold 15px'
            },scales: {
              x: {
                display: true,
                title: {
                  display: true
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Value'
                },
                suggestedMin: -10,
                suggestedMax: 200
              }
        
              
          }
        } }}></Chart>
        </div>
    </React.Fragment>
      )}
    </>

  );
}

export default Match;