import React from 'react'
import Header from '../componenets/Header';
import { useSelector } from 'react-redux';
import {  Typography } from '@mui/material';
import CardComponent from '../componenets/CardComponent';
import Subheader from '../componenets/Subheader';
import './MyFavorites.css'
const Myfavorites = () => {

  const Myfavoritemovies = useSelector((state) => state.favorites)
  let isFavorite = false;

  return (<>
    <Header />
    <Subheader />
    <Typography className="Title" variant="h4"  >MyFavorites</Typography>
    <div className='Myfavorites'>

      {Myfavoritemovies?.map((moives) => (

        <CardComponent
          movie={moives}
          isFavourite={isFavorite}
          handleFavoriteClick={""}
        />

      ))
      }

    </div>

  </>
  )
}
export default Myfavorites;