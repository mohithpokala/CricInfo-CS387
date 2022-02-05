import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import Card_comp from '../Components/Card'


  const Blogs = () => {

    const [matches, setMatches] =useState([]);
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(40);
    useEffect(()=>{
    getMatches(page*rowsPerPage,rowsPerPage);},[]);
  
    const [color,setColor]=useState(["purple","crimson","yellow","firebrick","indigo","blue","dodgerBlue","grey","lightSalmon","black","orange","violet","orangeRed"]);

  
    function getMatches(){
      fetch("http://localhost:5000/matches/")
      .then((res) => res.json()).then(
        (json) => {
          setMatches(json);
        }
      );
    };

    var Data = matches.map((data,index)=> {
      return (
        <Card_comp 
            data={data}
            index={index}
            color = {color[parseInt(data.match_winner)-1]}
        />
      );
    });
    
  
    return <div className="grid">{Data}</div>;
  
 
  };
  


export default Blogs;



