
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, addFavorite, removeFavorite } from '../../Store/action';
import { Typography, } from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';
import './MovieDetails.css'
import CustomFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';
const MovieDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const favoriteIds = favorites.map((values) => values.id);
  console.log("Before PASS", id);
  const [data, isLoading, error] = CustomFetchApi(fetchMovieDetails, id);
  console.log("Data inside Niv", data, isLoading, error);

  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (<>
    <Typography className="MovieTitle" variant='h4'  >Movie Details</Typography>

    <div className="Moviedetails">

      <CardComponent
        key={data.id}
        movie={data}
        isFavourite={favoriteIds.includes(data.id)}
        handleFavoriteClick={handleFavoriteClick}
      />
      {isLoading && <Typography variant='h6'>Loading...</Typography>}
      {error && <Typography variant='h6'>Error: {error.message}</Typography>}
      {!isLoading && !error && data && data.length === 0 && (
                    <Typography variant='h6'>No data available.</Typography>
                )}
    </div>
  </>
  );
};

export default MovieDetails;
