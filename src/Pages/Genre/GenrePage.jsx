import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticularGenereData, removeFavorite, addFavorite } from '../../Store/action';
import { useLocation,useParams } from 'react-router';
import { Box, Typography, Grid} from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';
import CustomFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';
import PropTypes from 'prop-types';
import './GenrePage.css'

const GenrePage = () => {
  const dispatch = useDispatch();
  const loaction = useLocation()
  const { id } = useParams()

  const { name } = loaction.state || { name: 'nogenre' };
  const favorites = useSelector((state) => state.favorites);

  const favoriteIds = favorites.map((values) => values.id);

  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const [data, isLoading, error] = CustomFetchApi(fetchParticularGenereData, id);




  return (
    <>
      <Typography variant="h4" className="MovieTitle">Genredetails page</Typography>
      <Typography variant="h5" className="GenereTitle">{name}</Typography>
      <Box sx={{ p: 2 }} >
      <Grid container spacing={2}>
        {data?.results?.map((moviee) => (
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


GenrePage.propTypes={
  id:PropTypes.number.isRequired,
}

export default GenrePage;