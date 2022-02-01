
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../CSS/Match.css'
import Typography from '@mui/material/Typography';
import Slideshow  from '../Components/Slideshow';

const Scorecard = () => {

    const [innings1,setInnings1]=useState(false);
    const [innings2,setInnings2]=useState(false);

    
    const match_id=useParams().match_id;
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecomparision/"+match_id+"/1")
                .then((res) => res.json())
                .then((json) => {
                setInnings1(json);
                console.log(json);
                });
        }, 2000);
    }, []);

    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecomparision/"+match_id+"/2")
                .then((res) => res.json())
                .then((json) => {
                setInnings2(json);
                console.log(json);
                });
        }, 2000);
    }, []);

  return (
    <>
      {!(innings1 && innings2 ) ? (
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

          <div style={{display:"block",width:"50%",position:"absolute"}}>
            <h5 style={{textAlign:"center"}}>
                First Innings
            </h5>
            <table>
            <tr>
              <td>Over</td>
              <td>Scoer</td>
              <td>Wickets</td></tr>
              {
                innings1.map( 
                  x => { return <tr>
                  <td>{x.over_id}</td>
                  <td>{x.score}</td>
                  <td>{x.wkts}</td>
          
          </tr>
          }
        )
      }
      </table>
      </div>
      <div style={{display:"block",width:"50%",position:"absolute",left:"50%"}}>
            <h5 style={{textAlign:"center"}}>
                Second Innings
            </h5>
            <table>
            <tr>
              <td>Over</td>
              <td>Scoer</td>
              <td>Wickets</td></tr>
              {
                innings2.map( 
                  x => { return <tr>
                 
                 <td>{x.over_id}</td>
                  <td>{x.score}</td>
                  <td>{x.wkts}</td>
          
          </tr>
          }
        )
      }
      </table>
      </div>


    </React.Fragment>
      )}
    </>
  );
}

export default Scorecard;