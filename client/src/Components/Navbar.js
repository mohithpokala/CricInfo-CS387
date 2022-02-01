import React from 'react';
import  '../CSS/Navbar.css';
  
const Navbar = (props) => {
  const renderButtons = (card, index) => {
    return (
      <li><a href={card.link}>{card.text}</a></li>
    );
  }; 
  return (
    <div className='navbar'>
    <ul>
      {props.links.map(renderButtons)}
  </ul></div>
  );
};
  
export default Navbar;