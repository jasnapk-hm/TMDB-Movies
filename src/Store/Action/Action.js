import {
  token,
  FETCH_MOVIEDETAILS_FAILURE,
  FETCH_MOVIEDETAILS_REQUEST,
  FETCH_MOVIEDETAILS_SUCCESS,
  FETCH_ALLMOVIES_FAILURE,
  FETCH_ALLMOVIES_REQUEST,
  FETCH_ALLMOVIES_SUCCESS,

 

} from "../../Constants/constants";


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






export const fetchPopularMovies = async () => {

  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('eroor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error', error);
  }
};

export const fetchMovieDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(fetchMovieDetailsSuccess(data))
      return data;
    } catch (error) {
      dispatch(fetchMovieDetailsFailure(error));
      console.error('Error fetching movie :', error);
    }
  }
};


export const fetchAllMovies = () => {
  return async (dispatch) => {
    dispatch(fetchAllMovieDetailsRequest())
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('eroor');
      }

      const data = await response.json();
      const firstMovies = data.results.slice(0, 20);
      dispatch(fetchAllMovieDetailsSuccess(firstMovies))
      return firstMovies;
    } catch (error) {
      console.error('error', error);
      dispatch(fetchAllMovieDetailsFailure(error))
    }
  }
};


