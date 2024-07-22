import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../Store/Action/GenreAction";
import { addFavorite, removeFavorite } from "../../Store/Action/GenreAction";
import { Box, Typography, Grid } from "@mui/material";
import CardComponent from "../../Components/CardComponent/CardComponent";
import "./AllMovie.css";
import useFetchApi from "../../Components/UseEfectComponent/UseEffectComponent";
import PropTypes from "prop-types";

const AllMovie = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const favoriteIds = favorites?.map((values) => values.id);
  const handleFavoriteClick = (movie) => {
    if (favoriteIds?.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const [data, isLoading, error] = useFetchApi(fetchAllMovies);

  return (
    <>
      <Typography variant="h4" className="AllMovieTitle">
        All Movies
      </Typography>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {data?.map((moviee) => (
            <Grid item key={moviee?.id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                movie={moviee}
                isFavourite={favoriteIds?.includes(moviee.id)}
                handleFavoriteClick={handleFavoriteClick}
                key={moviee.id}
              />
            </Grid>
          ))}
        </Grid>
        {isLoading && <Typography variant="h6">Loading...</Typography>}
        {error && <Typography variant="h6">Error: {error.message}</Typography>}
        {!isLoading && !error && data && data.length === 0 && (
          <Typography variant="h6">No data available.</Typography>
        )}
      </Box>
    </>
  );
};

AllMovie.propTypes = {
  id: PropTypes.number,
};

export default AllMovie;
