import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Navbar from '../Components/Navbar';

import download from '../Assets/download.jpg'
import '../CSS/rotateimage.css'

const Pointstable = () => {

  const [yrs,setyrs] = useState(false);
  const year=useParams().year;
  const [table, setTable]=useState([false]);
    

  useEffect(() => {
    let data=[]
    setTimeout(() => {
      fetch("http://localhost:5000/season_years/")
      .then((res) => res.json())
      .then(
        (json) => {
          for(var i=0;i<json.length;i++){ 
            data.push({"link":"./"+json[i]["season_year"],"text":"season_year"});
          } 
        } 
      );
    }, 2000);
    setyrs(data);
  }, []);   
  console.log(yrs);
  
  return (<>
   {!(yrs) ? (
        <img className ="animate" src={download} style ={{left:"30%",top:"30%",position:"absolute",width:"40%",height:"40%"}}/>
      ) : (
        <React.Fragment>
    <div style={{position:"absolute",width:"100%",height:"90%",top:"30%"}}>
      <Navbar links={yrs} width="100%" height="40%" top="10%" /> gdfgdv
    </div></React.Fragment>)}</>
  );
  
  };
  
  export default Pointstable;
