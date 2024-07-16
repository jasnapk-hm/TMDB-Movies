import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticularGenereData } from '../store/action';
import { useParams } from 'react-router';
import Header from '../componenets/Header';


const GenrePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const generedetails = useSelector((state) => state.generedetails)
  useEffect(() => {

    dispatch(fetchParticularGenereData(id))
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1 style={
        { display: "flex", justifyContent: "center" }
      }>Genredetailes page</h1>

    </>
  );
};

export default GenrePage;