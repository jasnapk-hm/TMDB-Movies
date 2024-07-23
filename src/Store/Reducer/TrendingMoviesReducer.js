import {
  FETCH_ALLMOVIES_FAILURE,
  FETCH_ALLMOVIES_REQUEST,
  FETCH_ALLMOVIES_SUCCESS,
} from "../../Constants/constants";
const initialState = {
  allmovies: [],
  loading: false,
  error: false,
};

const trendingMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default trendingMoviesReducer;
