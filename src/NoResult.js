import React from "react";
import "./App.css";
import { Col } from 'react-bootstrap';
import noResultImg from './noResult.png'

const NoResult = () => {
 
    return <Col className='center'><img src={noResultImg} alt='no_Result' width='80%' height='80%'></img></Col>
  }


export default NoResult;
