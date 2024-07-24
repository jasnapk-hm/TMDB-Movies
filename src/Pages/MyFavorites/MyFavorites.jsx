import React from "react";
import { useSelector } from "react-redux";
import { Typography,Box } from "@mui/material";
import CardComponent from "../../Components/CardComponent/CardComponent";
import "./MyFavorites.css";
import PropTypes from "prop-types";
const MyFavorites = () => {
  const myFavoritemovies = useSelector((state) => state.favorites.favorites);
  let isFavorite = false;

  return (
    <>
      <Typography className="MyTitle">MyFavorites</Typography>
      <Box className="Myfavorites">
        {myFavoritemovies?.map((moives) => (
          <CardComponent
            movie={moives}
            isFavourite={isFavorite}
            key={moives.id}
          />
        ))}
      </Box>
    </>
  );
};

MyFavorites.propTypes = {
  movie: PropTypes.object,
  isFavorite: PropTypes.string,
};
export default MyFavorites;
