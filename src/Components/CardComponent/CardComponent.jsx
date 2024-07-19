import React from 'react';
import { Card, CardMedia, CardContent, Box, Typography, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BaseURL } from '../../Constants/constants';
import './CardComponent.css';
import PropTypes from 'prop-types';
const CardComponenet = ({ movie, isFavourite, handleFavoriteClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box className="Box">
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`${BaseURL}/${movie?.poster_path}`}
          alt={movie?.title}
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="CardMedia"
        />
        <CardContent className='CardContent' >


          {location.pathname !== '/favourites' && (
            <IconButton onClick={() => handleFavoriteClick(movie)} >
              {isFavourite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
          <Typography variant="h5" className="MovieTitle">{movie?.title}</Typography>
          <Typography className="MovieRating">Rating: {movie?.vote_average}</Typography>
          <Typography className="MovieOverview">{movie?.overview}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

CardComponenet.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,



}
export default CardComponenet;