// src/pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, addFavorite } from '../store/action';
import {  Typography,} from '@mui/material';
import Header from '../componenets/Header';
import CardComponenet from '../componenets/CardComponenet';
import Subheader from '../componenets/Subheader';
import './MovieDetails.css'
const MovieDetailspage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const movielist = useSelector((state) => state.movies);
  const fav = useSelector((state) => state.favorites);

  useEffect(() => {

    dispatch(fetchMovieDetails({ id }))

  }, [dispatch]);

  const isFavorite = fav.map((x) => x.id).includes(movielist.id);
  const handleFavoriteClick = (movielist) => {
    dispatch(addFavorite(movielist));
  };
  if (!movielist) {
    return <div>Loading...</div>;
  }

  return (<>
    <Header />
    <Subheader />
    <Typography className="MovieTitle" variant='h4'  >Movie Details</Typography>
   
    <div className="Moviedetails"> 
      <CardComponenet
      movie={movielist}
      isFavourite={isFavorite}
      handleFavoriteClick={handleFavoriteClick}
    />
    </div>
  </>
  );
};

export default MovieDetailspage;
