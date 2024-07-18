import { token ,
  FETCH_GENRES_REQUEST,
   FETCH_GENRES_SUCCESS,
    FETCH_GENRES_FAILURE,
   FETCH_MOVIEDETAILS_FAILURE, 
   FETCH_MOVIEDETAILS_REQUEST, 
   FETCH_MOVIEDETAILS_SUCCESS,
   FETCH_ALLMOVIES_FAILURE, 
   FETCH_ALLMOVIES_REQUEST, 
   FETCH_ALLMOVIES_SUCCESS,
   FETCH_GENRESDATA_FAILURE,
   FETCH_GENRESDATA_SUCCESS,
   FETCH_GENRESDATA_REQUEST,
   ADD_FAVORITE,
   REMOVE_FAVORITE,
   ADD_USER,REMOVE_USER
} from "../Constants/constants";



export const addFavorite = (moviedata) => ({
    type: ADD_FAVORITE,
    payload: moviedata,
  });
  
  export const removeFavorite = (moviedata) =>
   
    ({
    
    type: REMOVE_FAVORITE,
    payload: moviedata,
  });
  

  export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
  });

  export const removeUser = () => ({
    type: REMOVE_USER,
   
  });
  export const fetchGenresRequest = () => ({
    type: FETCH_GENRES_REQUEST,
  });
  
  export const fetchGenresSuccess = (genres) => ({
    type: FETCH_GENRES_SUCCESS,
    payload: genres,
  });
  
  export const fetchGenresFailure = (error) => ({
    type: FETCH_GENRES_FAILURE,
    payload: error,
  });

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
  export const fetchParticularGenereDataRequest = () => ({
    type: FETCH_GENRESDATA_REQUEST ,
  });
  
  export const fetchParticularGenereDataSuccess = (generedetail) => ({
    type: FETCH_GENRESDATA_SUCCESS,
    payload: generedetail,
  });
  
  export const fetchParticularGenereDataFailure = (error) => ({
    type: FETCH_GENRESDATA_FAILURE,
    payload: error,
  });



  export const fetchGenres = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',{
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        dispatch(fetchGenresSuccess(data));
      } catch (error) {
       dispatch (fetchGenresFailure(error.message));
        console.error('Error fetching genres:', error);
      }
    };
  };


  export const fetchPopularMovies = async () => {
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`,
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
  
export const fetchMovieDetails =  ({id}) => {
  return async (dispatch) => {

  try {
   
    
    
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log("MovieDetails",data)
  dispatch(fetchMovieDetailsSuccess(data))
  return data;
  } catch (error) {
    dispatch (fetchMovieDetailsFailure(error));
    console.error('Error fetching movie :', error);
  }}
};


export const fetchAllMovies = () => {
  return async (dispatch) => {
    dispatch(fetchAllMovieDetailsRequest())
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
        method: 'GET',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('eroor');
      }
  
      const data = await response.json();
      const firstMovies = data.results.slice(0, 20);
      dispatch(fetchAllMovieDetailsSuccess(firstMovies))
   
    } catch (error) {
      console.error('error', error);
      dispatch(fetchAllMovieDetailsFailure(error))
    }}
  };


  export const fetchParticularGenereData = ({id}) => {
    console.log("gereid action",id)
    return async (dispatch) => {
dispatch(fetchParticularGenereDataRequest)
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('eroor');
        }
    
        const data = await response.json();
        const generedetail=data?.results;
       dispatch(fetchParticularGenereDataSuccess(generedetail))
        return data;
      } catch (error) {
        console.error('error', error);
        dispatch(fetchParticularGenereDataFailure(error))

      }}
    };