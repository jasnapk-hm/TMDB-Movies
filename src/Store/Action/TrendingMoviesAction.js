import { api } from "../../api/api";
import {
    FETCH_ALLMOVIES_FAILURE,
    FETCH_ALLMOVIES_REQUEST,
    FETCH_ALLMOVIES_SUCCESS,
  } from "../../Constants/constants";

export const fetchAllMovieDetailsRequest = () => ({
    type: FETCH_ALLMOVIES_REQUEST,
  });
  
  export const fetchAllMovieDetailsSuccess = (firstMovies) => ({
    type: FETCH_ALLMOVIES_SUCCESS,
    payload: firstMovies,
  });
  
  export const fetchAllMovieDetailsFailure = (error) => ({
    type: FETCH_ALLMOVIES_FAILURE,
    payload: error,
  });

  export const fetchAllMovies = () => {
    return async (dispatch) => {
      dispatch(fetchAllMovieDetailsRequest());
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
         api
        );
  
        if (!response.ok) {
          throw new Error("eroor");
        }
  
        const data = await response.json();
        const firstMovies = data.results.slice(0, 20);
        dispatch(fetchAllMovieDetailsSuccess(firstMovies));
        return firstMovies;
      } catch (error) {
        console.error("error", error);
        dispatch(fetchAllMovieDetailsFailure(error));
      }
    };
  };
  