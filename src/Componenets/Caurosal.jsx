import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { CardMedia } from '@mui/material';
import { fetchPopularMovies } from '../Store/Action/action';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../Constants/constants';

function Caurosal() {

  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies();
      setMovies(data?.results);
    };
    fetchData();
  }, []);

  return (
<div>
      <Carousel showThumbs={false} autoPlay >
        {movies?.map((movie) => (
          <CardMedia
            component="img"
            height="400"
            image={`${BaseURL}/${movie?.poster_path}`}
            alt={movie.title}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ width: "100%",  margin: "auto" }}
          />

        ))}
      </Carousel>
    </div>
  );
}
export default Caurosal;