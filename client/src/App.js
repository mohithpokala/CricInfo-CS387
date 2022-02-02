import ReactDOM from "react-dom";
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Match from "./pages/Match_details"
import Player from "./pages/Player"
import Pointstable from "./pages/Pointstable"
import Navbar from './Components/Navbar';



export default function App() {

  const navlinks=[
    {text:"HOME",link:"/"},
    {text:"MATHCES",link:"/matches"},
    {text:"PLAYERS",link:"/matches"},
  ]
  return (
    <div className="home_page">
      <Navbar links={navlinks} width="100%" height="10%" top="0%" />
      <div className="routing_part" style={{position:"fixed",width:"100%",height:"90%",top:"8%",overflowY:"scroll"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="matches" element={<Blogs />} />
            <Route path="/matches/:match_id" element={<Match />}/>
            <Route path="/players/:player_id" element={<Player />}/>
            <Route path="/pointstable/:year" element={<Pointstable />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
