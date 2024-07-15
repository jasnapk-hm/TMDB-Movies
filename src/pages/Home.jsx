import React from 'react';
import Header from '../componenets/Header';
import Caurosal from '../componenets/Caurosal';
import AllMovie from './AllMovie';
import { useDispatch, useSelector } from "react-redux";
import Subheader from '../componenets/Subheader';

const Main = () => {

  return (
    <div>
      <Header />
      <Subheader />
      <Caurosal />
      <AllMovie />
    </div>
  );
};

export default Main;