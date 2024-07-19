

import { 
   FETCH_MOVIEDETAILS_FAILURE, 
   FETCH_MOVIEDETAILS_REQUEST, 
   FETCH_MOVIEDETAILS_SUCCESS,

   FETCH_ALLMOVIES_FAILURE, 
   FETCH_ALLMOVIES_REQUEST, 
   FETCH_ALLMOVIES_SUCCESS,
   
  } from '../../Constants/constants';
const initialState = {
  
  movies: [],
  
  allmovies: [],

  user:localStorage.getItem('User_ID'),
  loading:false,
  error:false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case FETCH_MOVIEDETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MOVIEDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case FETCH_MOVIEDETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ALLMOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALLMOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        allmovies: action.payload,
      };
    case FETCH_ALLMOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: return state;
  }
};

export default rootReducer;