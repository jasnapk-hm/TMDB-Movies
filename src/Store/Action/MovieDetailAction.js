


import { api } from '../../api/api';
import {FETCH_MOVIEDETAILS_FAILURE,
    FETCH_MOVIEDETAILS_REQUEST,
    FETCH_MOVIEDETAILS_SUCCESS,

}  from '../../Constants/constants';


export const fetchMovieDetailsRequest = () => ({
    type: FETCH_MOVIEDETAILS_REQUEST,
  });
  
  export const fetchMovieDetailsSuccess = (data) => ({
    type: FETCH_MOVIEDETAILS_SUCCESS,
    payload: data,
  });
  
  export const fetchMovieDetailsFailure = (error) => ({
    type: FETCH_MOVIEDETAILS_FAILURE,
    payload: error,
  });

export const fetchMovieDetails = (id) => {
    return async (dispatch) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          api
        );
        const data = await response.json();
        dispatch(fetchMovieDetailsSuccess(data));
        return data;
      } catch (error) {
        dispatch(fetchMovieDetailsFailure(error));
        console.error("Error fetching movie :", error);
      }
    };
  };