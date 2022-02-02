
import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import bkg_summary from '../Assets/bkg_summ.jpg';
import '../CSS/Match.css';
import Link from '@mui/material/Link';
const Summary = (props) => {

    const [matchdet, setMatchdet]=useState(false);
    const [misc, setMisc] =useState(false);
    const [tb1, settb1]=useState(false);
    const [tb2, settb2]=useState(false);
    const [ta1, setta1]=useState(false);
    const [ta2, setta2]=useState(false);
    
    const match_id = props.match_id;
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
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
            fetch("http://localhost:5000/top3batsman/"+match_id+"/1")
                .then((res) => res.json())
                .then((json) => {
                    
                    setta1(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3batsman/"+match_id+"/2")
                .then((res) => res.json())
                .then((json) => {
                    setta2(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3bowlers/"+match_id+"/1")
                .then((res) => res.json())
                .then((json) => {
                    settb1(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3bowlers/"+match_id+"/2")
                .then((res) => res.json())
                .then((json) => {
                    settb2(json);
                }); 
        }, 2000);
    }, []);

    
  return (
    <div style={{width:"100%",top:"8%",position:"fixed",height:"92%",overflowY:"scroll"}}>
        <img src={bkg_summary} style={{width:"100%",position:"absolute",height:"100%",top:"0%",left:"0%"}}/>
      {!(ta1 && ta2 && tb1 && tb2 && misc && matchdet ) ? (
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        ><ReactLoading
          
          type={"cylon"}
          color={"white"}
          height={100}
          width={100}
        /></div>
      ) : (
        <React.Fragment>
          <div style={{display:"block",width:"60%",left:"20%",position:"absolute",top:"20vh",backgroundColor:"white",height:"50vh"}}>
            <table style={{display:"absolute",width:"100%",left:"0%",top:"0"}}>
            <tr style={{color:"white",height:"2vh",width:"100%",textAlign:"left",top:"0"}}>
              <td style={{color:"white",height:"2vh",width:"100%",textAlign:"left"}}> <h4>MATCH SUMMARY</h4></td>
            </tr>
            <tr style={{color:"white",height:"2vh",width:"100%",textAlign:"left"}}>
              <td style={{color:"black",height:"1vh",textAlign:"left"}}> {match_id},IPL,{matchdet[0].season_year}</td>
            </tr>
            </table>
            <br></br>
            <table style={{display:"absolute",width:"50%",left:"0%",top:"14vh",borderRight:"none",borderTop:"none",textAlign:"left"}}> 
            <tr >
              <td style={{color:"black",width:"20%",height:"1vh",textAlign:"left"}}> {matchdet[0].innings1_team}</td>
              <td style={{color:"black",width:"80%",height:"1vh",textAlign:"left"}}> {matchdet[0].toss_name=='runs'?'TOSS':''}</td>
            </tr>
              {
                range(0,2).map( 
                  x => { return(
                    (ta1[x])?(
                    <tr>
                  <td style={{width:"80%",textAlign:"left"}}><Link href={"/players/"+ta1[x].player_id} style={{color:"black",textDecoration:"none" }}> {ta1[x].player_name}</Link></td>
                  <td style={{textAlign:"left"}}>{ta1[x].runs_scored} &nbsp; {ta1[x].balls_faced}</td>
                  </tr>):(<tr><td style={{width:"80%",textAlign:"left"}}>&nbsp;</td>
                    <td style={{textAlign:"left"}}> &nbsp; </td></tr>));
                }
                )
      }
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"50%",top:"14vh",borderBottom:"none",borderLeft:"none",borderTop:"none"}}> 
                <tr>
                <td style={{width:"0%"}}></td>
              <td style={{color:"black",width:"40%",height:"1vh",textAlign:"right"}}> {misc[0].total1}/{misc[0].wkts1}</td>
            </tr>
            
              {
                
                range(0,2).map( 
                    x => { return(
                      (tb1[x])?(
                      <tr>
                    <td style={{width:"80%",textAlign:"left"}}><Link href={"/players/"+tb1[x].player_id} style={{color:"black",textDecoration:"none"}}> {tb1[x].player_name}</Link></td>
                  <td style={{width:"15%",textAlign:"right"}}>{tb1[x].wkts_taken}-{tb1[x].runs_given} &nbsp; &nbsp; {tb1[x].balls_bowled}</td>
                    </tr>):(<tr><td style={{width:"80%",textAlign:"left"}}> &nbsp;</td>
                  <td style={{width:"15%",textAlign:"right"}}>&nbsp;</td></tr>));
                  }
                  )
        }
        
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"0%",top:"32.5vh",borderRight:"none",borderTop:"none",textAlign:"left"}}> 
            <tr >
              <td style={{color:"black",width:"20%",height:"1vh",textAlign:"left"}}> {matchdet[0].innings2_team}</td>
              <td style={{color:"black",width:"80%",height:"1vh",textAlign:"left"}}> {matchdet[0].toss_name=='runs'?'':'TOSS'}</td>
            </tr>
              {
                range(0,2).map( 
                    x => { return(
                      (ta2[x])?(
                      <tr>
                    <td style={{width:"80%",textAlign:"left"}}><Link href={"/players/"+ta2[x].player_id} style={{color:"black",textDecoration:"none" }}> {ta2[x].player_name}</Link></td>
                    <td style={{textAlign:"left"}}>{ta2[x].runs_scored} &nbsp; {ta2[x].balls_faced}</td>
                    </tr>):(<tr>
                        <td style={{width:"80%",textAlign:"left"}}>&nbsp;</td>
                    <td style={{textAlign:"left"}}> &nbsp; </td>

                    </tr>));
                  }
                  )
      }
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"50%",top:"32.5vh",borderTop:"none",borderLeft:"none"}}> 
                <tr>
                <td style={{width:"0%"}}></td>
              <td style={{color:"black",width:"40%",height:"1vh",textAlign:"right"}}> {misc[0].total1}/{misc[0].wkts1}</td>
            </tr>
              {
                range(0,2).map( 
                    x => { return(
                      (tb2[x])?(
                      <tr>
                    <td style={{width:"80%",textAlign:"left"}}><Link href={"/players/"+tb2[x].player_id} style={{color:"black",textDecoration:"none"}}> {tb2[x].player_name}</Link></td>
                  <td style={{width:"15%",textAlign:"right"}}>{tb2[x].wkts_taken}-{tb2[x].runs_given} &nbsp; &nbsp; {tb2[x].balls_bowled}</td>
                    </tr>):(<tr>   <td style={{width:"80%",textAlign:"left"}}> &nbsp;</td>
                  <td style={{width:"15%",textAlign:"right"}}>&nbsp;</td>
        </tr>));
                  }
                  )
                  
        
      }
      
      </table>
      </div>
    </React.Fragment>
      )}
    </div>

  );
}

export default Summary;