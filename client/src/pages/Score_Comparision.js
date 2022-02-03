
import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import im3 from '../Assets/im3.jpg'
const Score_comp = (props) => {

    const [chartData, setChartData] = useState({});
    const [done, setdone] = useState(false);

    const match_id = props.match_id;

    const [matchdet, setMatchdet]=useState(false);
    
    const [y1,setY1] = useState([]);
    const [y2,setY2] = useState([]);
    const [y3,setY3] = useState([]);
    const [y4,setY4] = useState([]);

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
        const p=matchdet?matchdet[0].team1name:'dummy';
        const q=matchdet?matchdet[0].team2name:'dummy';
        let runs1 = [0];
        let runs2 = [0];
        let wkts1 = [{x:0,y:0}];
        let wkts2 = [{x:0,y:0}];
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
  return (
    <div style={{width:"100%",top:"8%",position:"fixed",height:"92%",overflowY:"scroll"}}>
      
      <img src={im3} style={{width:"100%",position:"absolute",height:"110%",top:"0%",left:"0%"}}/>
      {!(matchdet && done)? (
        
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
          <br></br><br></br><br></br>

      <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"30%",backgroundColor:"yellow",float:"center",left:"25%"}}>
      <h4 style={{display:"block",top:"20%",textAlign:"center",width:"100%"}}>Score Comparision</h4>

          <Chart 
          data={{
            labels : range(0,20),
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
                label: "Fall of wickets for "+matchdet[0].innings1_team,
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
                label: "Fall of wickets for "+matchdet[0].innings2_team,
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
            },
            scales: 
            { y: 
                {
                  title: { 
                    display:true,
                    text: '$/kWh'
                  },
                  ticks: {
                    callback: function (value, index, values) {return value;}}}
          }
        } }}></Chart>
        <p>X-axis:Overs  Y-axis:Runs Scored <br></br>The dots indicate fall of wickets       <br></br>  <b>{matchdet[0].match_winner==matchdet[0].innings1_team?matchdet[0].innings1_team:matchdet[0].innings2_team} won by {matchdet[0].win_margin} {matchdet[0].win_type} </b>
</p>
        </div>
        </React.Fragment>
      )}
    </div>
  );
      }

export default Score_comp;
