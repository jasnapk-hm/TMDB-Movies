import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies, addFavorite, removeFavorite } from '../store/action';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import './Allmovie.css';

const AllMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);
  const allMovies = useSelector((state) => state.allmovies);
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const favoriteIds = favorites.map((values) => values.id);

  const handleFavoriteClick = (movie) => {
    if (favoriteIds.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (<>
    <Typography variant="h4" className="AllMovieTitle">All Movies</Typography>
    <Box sx={{ p: 2 }}>
      
      <Grid container spacing={2}>
        {allMovies?.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card >
             
              <CardMedia
                component="img"
                height="400"
                image={`${baseURL}/${movie?.poster_path}`} 
                alt={movie.title}
                onClick={() => navigate(`/movie/${movie.id}`)}
                
              />
               <IconButton 
                className="FavoriteIconButton" 
                onClick={() => handleFavoriteClick(movie)}
              >
                {favoriteIds.includes(movie.id) ? (
                  <FavoriteIcon className="FavIcon" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <CardContent >
                <Typography variant="h6" className="Moviename">{movie.title}</Typography>
                <Typography variant="body2 " className="Movierating">Rating: {movie.vote_average}</Typography>
                <Typography
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    paddingTop:"5px"
                  }}
                  variant="body2"
                >
                  Overview: {movie.overview}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default AllMovie;
