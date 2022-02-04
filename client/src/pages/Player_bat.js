import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import { Chart } from 'react-chartjs-2';

import { chartColors } from "./colors";
import ReactLoading from "react-loading";
import '../CSS/Match.css'
const Player_bat = () => {

    const player_id=useParams().player_id;
    const [done,setDone]=useState(false);
  
    const [playerbat, setPlayerbat]=useState(false);
    const [match,setMatch]=useState(false);
    const [runs,setRuns]=useState(false);
    const [colors,setColors]=useState(false);
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

    useEffect(() => {
        setTimeout(() => {
            fetch(
                "http://localhost:5000/players/"+player_id+"/3")
                            .then((res) => res.json())
                            .then((json) => {
                               setPlayerbat(json);
                               console.log(json);
                            });
            let m = [];
            let r = [];
            let c=[];
            fetch("http://localhost:5000/players/"+player_id+"/0")
                .then((res) => res.json())
                .then((json) => {
                    for(var i=0;i<json.length;i++){
                        m.push(json[i]['match_id']);
                        r.push(json[i]['score_match'])
                        if(parseInt(r[i],10)<20) c.push('rgba(255, 0, 0, 1)');
                        else if(parseInt(r[i],10)<30) c.push('rgba(0,0,255,1)');
                        else if(parseInt(r[i],10)<50) c.push('rgba(153, 102, 255, 1)');
                        else if(parseInt(r[i],10)>=50) c.push('rgba(0,255,0,1)');
                      }
                 setMatch(m);
                 setRuns(r);
                 setColors(c);
                      
                  setDone(true);
                });            
        }, 2000);
    }, []);

    return (
        <>
      {!(done && playerbat && match && runs && colors && player) ? (

        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        ><ReactLoading
          
          type={"bubbles"}
          color={"orange"}
          height={100}
          width={100}
        /></div>
      ) : (
        
        (parseInt(playerbat[0].number_of_matches_played,10)!=0)?(

          <React.Fragment>
    
          <div style={{width:"30%",height:"90%",top:"15%",position:"absolute",textAlign:"center",left:"0"}}>
      
      
            <table style={{width:"100%",position:"absolute"}}>
              <tr><td style={{width:"50%",textAlign:"left"}}><h3>{player[0].player_name}</h3></td>
              <td style={{width:"50%",textAlign:"right"}}><h3>Batting Career</h3></td>
              </tr>
              <tr><td style={{width:"50%",colspan:"1",textAlign:"left"}}><b>Innings Played</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].number_of_matches_played}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Runs</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].total_runs}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Fours</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].four}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Sixes</b> </td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].six}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Fifties</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].num_fifty}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Highest Score</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].hs}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Strike Rate</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].strike_rate}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Average</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].average}</td></tr>
      
            </table>
            </div>
      
            <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"10%",backgroundColor:"white",float:"center",left:"45%"}}>
            <Chart 
                data={{
                  labels : match,
                  datasets: [
                    {
                      type :"bar",
                      label: ">=50",
                      data: runs,
                      borderWidth: 1,
                      // pointRadius:0.5,
                      borderColor:colors,
                      backgroundColor:colors,
                    },
                    
                    {
                      type :"line",
                      label: ">=30 and <50",
                      data: [],
                      borderWidth: 1,
                      // pointRadius:0.5,
                      backgroundColor:'rgba(153, 102, 255, 1)',
                      borderColor:'rgba(153, 102, 255, 1)'
                    },
                    
                    {
                      type :"line",
                      label: ">=20 and <30",
                      data: [],
                      borderWidth: 1,
                      // pointRadius:0.5,
                      backgroundColor:'rgba(0,0,255,1)',
                      borderColor:'rgba(0,0,255,1)'
                    },
                    
                    {
                      type :"line",
                      label: "<20",
                      data: [],
                      borderWidth: 1,
                      // pointRadius:0.5,
                      backgroundColor:'rgba(255, 0, 0, 1)',
                      borderColor:'rgba(255, 0, 0, 1)'
                    }
                  ],
                  options:{ maintainAspectRatio: false }
                }} height="10px" width="20px" position="relative" options={{plugins: {
                  title: {
                      display: true,
                      text: 'Runs scored Vs  Match ID',
                      color:'red',
                      font:'bold 15px'
                  },
                  scales: [
                      {
                        title: { 
                          
                                    display:true,
                                    text: 'Runs Scored',
                                    color:'red',
                                    font:'bold 15px'
                                  }
                      }
      
      
                  ]
              } }}></Chart>
              </div>
      
      
      
          </React.Fragment>



        ):(
        <h2>Not Everyone is an allrounder</h2>)
    
      )}
    </>
    );
    
    

};

export default Player_bat;