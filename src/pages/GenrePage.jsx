import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticularGenereData, removeFavorite, addFavorite } from '../store/action';
import { useLocation, useNavigate, useParams } from 'react-router';
import Header from '../componenets/Header';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GenrePage = () => {
  const dispatch = useDispatch();
  const loaction = useLocation()
  const { id } = useParams()

  const { name } = loaction.state || { name: 'nogenre' };
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();
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
      <Header />
      <Typography variant="h4" className="AllMovieTitle">Genredetails page</Typography>
      <Box sx={{ p: 2 }} >
        <Typography variant="h4" style={{ justifyContent: "left", fontWeight: 900, fontSize: "30px" }}>{name}</Typography>
        <Grid container spacing={2}>
          {details?.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card>

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
                      paddingTop: "5px",
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

export default GenrePage;