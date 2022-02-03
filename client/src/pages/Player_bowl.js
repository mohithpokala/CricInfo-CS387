import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";

import { Chart } from 'react-chartjs-2';

import { chartColors } from "./colors";

const Player_bowl = () => {

    const player_id=useParams().player_id;
    const [playerbowl, setPlayerbowl]=useState([false]);

    const [match,setMatch]=useState(false);
    const [runs,setRuns]=useState(false);
    const [wickets,setWickets]=useState(false);
    const [done,setDone]=useState(false);
  



        useEffect(() => {
          setTimeout(() => {
              fetch(
                  "http://localhost:5000/players/"+player_id+"/2")
                              .then((res) => res.json())
                              .then((json) => {
                                 setPlayerbowl(json);
                                 console.log(json);
                              });
              let m = [];
              let r = [];
              let w=[];
              let c=[];
              fetch("http://localhost:5000/players/"+player_id+"/1")
                  .then((res) => res.json())
                  .then((json) => {
                      for(var i=0;i<json.length;i++){
                          m.push(json[i]['match_id']);
                          r.push(json[i]['runs_given']);
                          w.push(json[i]['num_wkts']);
                        }
                   setMatch(m);
                   setRuns(r);
                   setWickets(w);
                        
                    setDone(true);
                  });            
          }, 2000);
      }, []);
  

    return (
        
        <>
      {!(done && playerbowl && match && runs && wickets) ? (
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
        <React.Fragment>
      
    
    <div style={{width:"100%",height:"90%",top:"90%",position:"absolute",textAlign:"center"}}>
    <h3>Bowling Career</h3>
      <b>{ "Number of Innings Bowled"}</b><b>:</b>{playerbowl[0].num_matches}
      <br/>
      <b>{"Runs Given"}</b><b>:</b>{playerbowl[0].runs_given}
      <br/>
      <b>{"Number of wickets"}</b><b>:</b>{playerbowl[0].num_wkts}
      <br/>
      <b>{"Overs bowled"}</b><b>:</b>{playerbowl[0].overs}
      <br/>
      <b>{"Number of balls bowled"}</b><b>:</b>{playerbowl[0].balls}
      <br/>
      <b>{"Economy"}</b><b>:</b>{playerbowl[0].economy}
      <br/>
      <b>{"Number of Fifers"}</b><b>:</b>{playerbowl[0].five_wkts}
      <br/>
      </div>

      <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"10%",backgroundColor:"white",float:"center",left:"25%"}}>
      <Chart 
          data={{
            labels : match,
            datasets: [
              {
                type :"bar",
                label: "Runs",
                data: runs,
                borderWidth: 1,
                // pointRadius:0.5,
                borderColor:'rgba(153, 102, 255, 0.2)',
                backgroundColor:'rgba(153, 102, 255, 0.2)',
              },
              
              {
                type :"line",
                label: "Wickets",
                data: wickets,
                borderWidth: 1,
                // pointRadius:0.5,
                borderColor:'rgba(0, 0, 255, 1)'
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
      )}
    </>


    );
    // <React.Fragment>
    
    
    // <h3>Bowling Career:</h3>
    // <h4>Number of Innings Bowled:{playerbowl[0].num_matches}</h4>
    // <h4>Runs Given:{playerbowl[0].runs_given}</h4>
    // <h4>Number of wickets:{playerbowl[0].num_wkts}</h4>
    // <h4>Overs:{playerbowl[0].overs}</h4>
    // <h4>Number of balls bowled:{playerbowl[0].balls}</h4>
    // <h4>Economy:{playerbowl[0].economy}</h4>
    // <h4>Number of Fifers:{playerbowl[0].five_wkts}</h4>
     
    // </React.Fragment>
    // ;

};

export default Player_bowl;