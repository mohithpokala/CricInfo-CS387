import React, { useState } from 'react';
import  '../CSS/Navbar.css';
  
const Navbar = (props) => {
  const [x,setX] =useState(0);
  const func = (i)=>{
    setX(i);
  }
  const renderButtons = (card, index) => {
    return (
      <li ><a href={card.link}>{card.text}</a></li>
    );
  }; 
  return (
    <div className='navbar' style={{width:props.width,height:props.height,top:props.top}}>
    <ul>
      {props.links.map(renderButtons)}
  </ul></div>
  );
};
  
export default Navbar;