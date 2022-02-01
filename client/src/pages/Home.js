import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import srh from '../Assets/srh.png'
import csk from '../Assets/csk.png'
import kkr from '../Assets/kkr.png'
import kxip from '../Assets/kxip.png'
import pwi from '../Assets/pwi.png'
import mi from '../Assets/mi.png'
import gl from '../Assets/gl.png'
import rcb from '../Assets/rcb.png'
import ktk from '../Assets/ktk.png'
import dd from '../Assets/dd.png'
import dc from '../Assets/dc.png'
import rr from '../Assets/rr.png'
import dc2 from '../Assets/rpsg.png'
import blank from '../Assets/blank.png'
import Slideshow from '../Components/Slideshow'
import { width } from '@mui/system';
import download from '../Assets/download.jpg'
import '../CSS/rotateimage.css'
export default function Home() {
  console.log("ngujyjuy");
  const L=[
    {im:srh},
    {im:blank},
    {im:csk},
    {im:blank},
    {im:mi},
    {im:blank},
    {im:kkr},
    {im:blank},
    {im:kxip},
    {im:blank},
    {im:pwi},
    {im:blank},
    {im:gl},
    {im:blank},
    {im:rcb},
    {im:blank},
    {im:dd},
    {im:blank},
    {im:dc},
    {im:blank},
    {im:rr},
    {im:blank},
    {im:ktk},
    {im:blank},
    {im:dc},
  ]

  const L2=[
    
    
    {im:blank},
    {im:dd},
    {im:blank},
    {im:dc},
    {im:blank},
    {im:rr},
    {im:blank},
    {im:ktk},
    {im:blank},
    {im:dc},
    {im:blank},
    {im:srh},
    {im:blank},
    {im:csk},
    {im:blank},
    {im:mi},
    {im:blank},
    {im:kkr},
    {im:blank},
    {im:kxip},
    {im:blank},
    {im:pwi},
    {im:blank},
    {im:gl},
    {im:blank},
    {im:rcb}
  ]
  const prop = {}

  return (
    <div>
    <img className ="animate" src={download} style ={{left:"40%",top:"30%",position:"absolute",width:"20%",height:"30%"}}/>
    <Slideshow img={L} fade={true} width={"20vh"} ml={"10%"} mt={"30%"} ht={"20vh"} />
    <Slideshow img={L2} fade={true} width={"20vh"} ml={"80%"} mt={"30%"} ht={"20vh"} /></div>
  );
}