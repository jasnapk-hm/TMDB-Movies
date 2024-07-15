import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { CardMedia } from '@mui/material';
import { fetchPopularMovies } from '../store/action';
import { useNavigate } from 'react-router-dom';
function Caurosal() {

  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/w500"
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
            image={`${baseURL}/${movie?.poster_path}`}
            alt={movie.title}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ width: "100%", maxWidth: "900px", margin: "auto" }}
          />

        ))}
      </Carousel>
    </div>
  );
}
export default Caurosal;