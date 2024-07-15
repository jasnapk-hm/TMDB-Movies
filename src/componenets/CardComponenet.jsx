import React from 'react';
import { Card, CardMedia, CardContent,Box, Typography, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const CardComponenet= ({ movie, isFavourite,handleFavoriteClick}) => {
const location = useLocation();
const baseURL = "https://image.tmdb.org/t/p/w500";
  return (
    <Box sx={{padding:"20px" }}> 
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={`${baseURL}/${movie?.poster_path}`} 
        alt={movie?.title}

        style={{ cursor: 'pointer',width:"500px" }}
      />
     <CardContent style={{ display: 'flex', flexDirection:"column",}}>
          <IconButton onClick={()=>handleFavoriteClick(movie)} style={{ marginLeft: 'auto' }}>
              
              {location.pathname !== '/favourites' && (
              <IconButton onClick={() => handleFavoriteClick(movie)} style={{ marginLeft: 'auto' }}>
                {isFavourite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
              </IconButton>
            )}

          </IconButton>
        <Typography variant="h6" style={{fontWeight:'bold'}}>{movie?.title}</Typography>
        <Typography variant="body1" style={{color:"brown"}}>Rating: {movie?.vote_average}</Typography>
        <Typography variant="body1">{movie?.overview}</Typography>
      </CardContent>
    </Card>
    </Box>
  );
};
export default CardComponenet;