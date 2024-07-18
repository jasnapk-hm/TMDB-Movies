
import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, addFavorite ,removeFavorite} from '../../Store/action';
import {  Typography,} from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';
import './MovieDetails.css'
// import CustomFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';
const MovieDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const movielist = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.favorites);
  const favoriteIds = favorites.map((values) => values.id);

  // const { data: movielist, isPending: loading, error } = CustomFetchApi( fetchMovieDetails, { id });



console.log("data",movielist)
  useEffect(() => {

    dispatch(fetchMovieDetails({ id }))

  }, [dispatch,id]);

 

  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (<>
    <Typography className="MovieTitle" variant='h4'  >Movie Details</Typography>
   
    <div className="Moviedetails"> 
      <CardComponent
      movie={movielist}
       isFavourite={favoriteIds.includes(movielist?.id)}
      handleFavoriteClick={handleFavoriteClick}
    />
    </div>
  </>
  );
};

export default MovieDetails;
