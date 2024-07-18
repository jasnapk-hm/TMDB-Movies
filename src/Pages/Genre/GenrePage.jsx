import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticularGenereData, removeFavorite, addFavorite } from '../../Store/action';
import { useLocation,useParams } from 'react-router';
import { Box, Typography, Grid} from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';

import './GenrePage.css'

const GenrePage = () => {
  const dispatch = useDispatch();
  const loaction = useLocation()
  const { id } = useParams()

  const { name } = loaction.state || { name: 'nogenre' };
  const details = useSelector((state) => state.generedetails)
  const favorites = useSelector((state) => state.favorites);

  const favoriteIds = favorites.map((values) => values.id);

  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  useEffect(() => {

    dispatch(fetchParticularGenereData({ id }));

  }, [dispatch,id]);

  return (
    <>
      <Typography variant="h4" className="MovieTitle">Genredetails page</Typography>
      <Typography variant="h5" className="GenereTitle">{name}</Typography>
      <Box sx={{ p: 2 }} >
      <Grid container spacing={2}>
        {details?.map((moviee) => (
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
    </Box>
    </>
  );
};

export default GenrePage;