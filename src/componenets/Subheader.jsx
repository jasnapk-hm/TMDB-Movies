import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../store/action'
import { Box, Chip } from '@mui/material';
import { useNavigate, } from 'react-router-dom';
const Subheader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const ge = useSelector((state) => state.genere);


  const handleClick = (id,name) => {
    navigate(`/genere/${id}`, { state: { name } })
  }
  useEffect(() => {

    dispatch(fetchGenres())


  }, [dispatch]);

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
        {ge?.genres?.map((genre) => (
          <Chip onClick={() => handleClick(genre.id,genre.name)} key={genre} label={genre.name} style={{ backgroundColor: "rgb(151 195 229)", margin: 5, fontSize: "14px", }} />
        ))}
      </Box>

    </>);

}
export default Subheader;