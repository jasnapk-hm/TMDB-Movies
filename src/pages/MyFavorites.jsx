import React from 'react'
import Header from '../componenets/Header';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import CardComponenet from '../componenets/CardComponenet';
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

        <CardComponenet
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