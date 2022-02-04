import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import { Chart } from 'react-chartjs-2';

import { chartColors } from "./colors";
import ReactLoading from "react-loading";

const Player_bat = () => {

    const player_id=useParams().player_id;
    const [done,setDone]=useState(false);
  
    const [playerbat, setPlayerbat]=useState(false);
    const [match,setMatch]=useState(false);
    const [runs,setRuns]=useState(false);
    const [colors,setColors]=useState(false);


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
                        if(parseInt(r[i],10)<20) c.push('rgba(255, 0, 0, 0.2)');
                        else if(parseInt(r[i],10)<30) c.push('rgba(0,0,255,0.2)');
                        else if(parseInt(r[i],10)<50) c.push('rgba(153, 102, 255, 0.2)');
                        else if(parseInt(r[i],10)>=50) c.push('rgba(0,255,0,0.2)');
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
      {!(done && playerbat && match && runs && colors) ? (
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

    <h3>Batting Career</h3>
    {
      <b>{ "Innings Played"}</b><b>:</b>{playerbat[0].number_of_matches_played}
      <br/>
      <b>{"Runs"}</b><b>:</b>{playerbat[0].total_runs}
      <br/>
      <b>{"Fours"}</b><b>:</b>{playerbat[0].four}
      <br/>
      <b>{"Sixes"}</b><b>:</b>{playerbat[0].six}
      <br/>
      <b>{"Fifties"}</b><b>:</b>{playerbat[0].num_fifty}
      <br/>
      <b>{"Highest Score"}</b><b>:</b>{playerbat[0].hs}
      <br/>
      <b>{"Average"}</b><b>:</b>{playerbat[0].average}
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
                borderColor:colors,
                backgroundColor:colors,
              },
              
              {
                type :"line",
                label: "Runs",
                data: runs,
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
    
    

};

export default Player_bat;