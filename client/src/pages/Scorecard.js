
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import {Utils} from 'chartjs'
const Scorecard = () => {

    const [chartData, setChartData] = useState({});
    const [done, setdone] = useState(false);

    const match_id=useParams().match_id;
    
    useEffect(() => {
        setTimeout(() => {
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
                  setChartData({
                    labels: x,
                    datasets: [
                      {
                        type :"line",
                        label: "level of thiccness",
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
                        label: "level of thiccness",
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
    var x = range(1, 20); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    console.log(chartData);
  return (
    <>
      {!done? (
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
          <div style={{position:"absolute",width:"80%",height:"70%"}}>
          <Chart data={chartData} height="20px" width="20px" position="relative" options={{ maintainAspectRatio: false }}></Chart>
          </div>
        </React.Fragment>
      )}
    </>
  );
      }

export default Scorecard;
