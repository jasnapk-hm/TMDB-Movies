import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../Store/Action/MovieDetailAction";
import {
  addFavorite,
  removeFavorite,
} from "../../Store/Action/MyFavoriteAction";

import { Typography } from "@mui/material";
import CardComponent from "../../Components/CardComponent/CardComponent";
import "./MovieDetails.css";
import useFetchApi from "../../Components/UseEfectComponent/UseEffectComponent";
import PropTypes from "prop-types";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoriteIds = favorites?.map((values) => values.id);
  const [data, isLoading, error] = useFetchApi(fetchMovieDetails, id);
  const handleFavoriteClick = (movie) => {
    if (favoriteIds?.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <>
      <Typography className="MovieTitle" variant="h4">
        Movie Details
      </Typography>

      <div className="Moviedetails">
        <CardComponent
          key={data.id}
          movie={data}
          isFavourite={favoriteIds?.includes(data.id)}
          handleFavoriteClick={handleFavoriteClick}
        />
        {isLoading && <Typography variant="h6">Loading...</Typography>}
        {error && <Typography variant="h6">Error: {error.message}</Typography>}
        {!isLoading && !error && data && data.length === 0 && (
          <Typography variant="h6">No data available.</Typography>
        )}
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  id: PropTypes.number,
};

export default MovieDetails;
