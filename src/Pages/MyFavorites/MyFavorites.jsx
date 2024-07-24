import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import CardComponent from "../../Components/CardComponent/CardComponent";
import "./MyFavorites.css";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import {
  addFavorite,
  removeFavorite,
} from "../../Store/Action/MyFavoriteAction";
const MyFavorites = () => {
  const myFavoritemovies = useSelector((state) => state.favorites.favorites);
  // let isFavorite = false;
  console.log("myFavoritemovies", myFavoritemovies.length);
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  const favoriteIds = favorites?.map((values) => values.id);

  const handleFavoriteClick = (movie) => {
    if (favoriteIds?.includes(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <>
      <Typography className="MyTitle">MyFavorites</Typography>
      <Box className="Myfavorites">
        {myFavoritemovies?.map((moives) => (
          <CardComponent
            movie={moives}
            key={moives.id}
            isFavourite={favoriteIds?.includes(moives.id)}
            handleFavoriteClick={handleFavoriteClick}
          />
        ))}
      </Box>
      {myFavoritemovies && myFavoritemovies?.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            top: "60px",
            color: "red",
          }}
        >
          No data available.
        </Typography>
      )}
    </>
  );
};

MyFavorites.propTypes = {
  movie: PropTypes.object,
  isFavorite: PropTypes.string,
};
export default MyFavorites;
