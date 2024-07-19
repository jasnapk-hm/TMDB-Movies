import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies, addFavorite, removeFavorite } from '../../Store/action';
import { Box, Typography, Grid } from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';
import './AllMovie.css';
import CustomFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';

const AllMovie = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  // const allMovies = useSelector((state) => state.allmovies);
  const favoriteIds = favorites.map((values) => values.id);
  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const [data, isLoading, error] = CustomFetchApi(fetchAllMovies);


  console.log("Alll",data)

  // useEffect(() => {
  //   dispatch(fetchAllMovies());
  // }, [dispatch]);

  return (<>
    <Typography variant="h4" className="AllMovieTitle">All Movies</Typography>
    <Box sx={{ p: 2 }} >
      <Grid container spacing={2}>
        {data?.map((moviee) => (
          <Grid item key={moviee.id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent    
             movie={moviee}
             isFavourite={favoriteIds.includes(moviee.id)}
             handleFavoriteClick={handleFavoriteClick} 
             key={moviee.id}
            />
          </Grid>
        ))
        }
      </Grid>
      {isLoading && <Typography variant='h6'>Loading...</Typography>}
      {error && <Typography variant='h6'>Error: {error.message}</Typography>}
      {!isLoading && !error && data && data.length === 0 && (
                    <Typography variant='h6'>No data available.</Typography>
                )}
    </Box>
  </>
  );
};

export default AllMovie;
