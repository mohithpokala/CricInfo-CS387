import ReactDOM from "react-dom";
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Match from "./pages/Match"
import Player from "./pages/Player"
import Pointstable from "./pages/Pointstable"
import Navbar from './Components/Navbar';
import download from './Assets/download.jpg';



export default function App() {

  const navlinks=[
    {text:"HOME",link:"/"},
    {text:"MATHCES",link:"/matches"},
    {text:"PLAYERS",link:"/matches"},
    {text:"SEASON",link:"/"},
    {text:"VENUE",link:"/"},
    {text:"ABOUT",link:"/"}
  ]
  return (
    <div className="home_page">
      <Navbar links={navlinks} />
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
