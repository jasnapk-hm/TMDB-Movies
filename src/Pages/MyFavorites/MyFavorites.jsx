import React from 'react'
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import CardComponent from '../../Components/CardComponent/CardComponent';
import './MyFavorites.css';
import PropTypes from 'prop-types';
const MyFavorites = () => {

  const Myfavoritemovies = useSelector((state) => state.favorites)
  let isFavorite = false;

  return (<>

    <Typography className='MyTitle'>MyFavorites</Typography>
    <div className='Myfavorites'>

      {Myfavoritemovies?.map((moives) => (

        <CardComponent
          movie={moives}
          isFavourite={isFavorite}
          handleFavoriteClick={""}
          key={moives.id}
        />

      ))
      }

    </div>

  </>
  )
}

MyFavorites.propTypes={
  movie:PropTypes.object,
  isFinite:PropTypes.string.isRequired,
}
export default MyFavorites;