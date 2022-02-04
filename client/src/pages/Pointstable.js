import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Navbar from '../Components/Navbar';
import ReactLoading from "react-loading";

import download from '../Assets/download.jpg'
import '../CSS/rotateimage.css'
import PTable from './P_table';

const Pointstable = () => {

  const [yrs,setyrs] = useState(false);
  const year=useParams().year;
  const [table, setTable]=useState([false]);
    
  const [y,setY]=useState([false]);
  useEffect(() => {
    setTimeout(() => {
      
    let data = [];

      fetch("http://localhost:5000/season_years/")
      .then((res) => res.json())
      .then(
        (json) => {
          for(var i=0;i<json.length;i++){ 
            data.push(json[i]["season_year"]);
          } 
          setY(json.length);
        } 
      );
      setyrs(data);
    }, 2000);
  }, []);   
  const renderButtons = (card) => {
    console.log(card);
    return (
      <li style={{float:"right"}}><a href={"./"+card}>{card}</a></li>
    );
  }; 
  console.log(yrs);
  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  return (<>
   {!(yrs) ? (
        <></>
      ) : (
        <React.Fragment>
    <div style={{position:"absolute",width:"100%",height:"90%"}}>
     <ul style={{top:"0%",width:"40%",paddingLeft:"none",right:"0%"}}>{yrs.map(renderButtons)}
  </ul>      <PTable year={year} style={{top:"10%",height:"100%",position:"absolute",width:"80%",left:"0%",backgroundColor:"green"}}/>

    </div></React.Fragment>)}</>
  );
  
  };
  
  export default Pointstable;
