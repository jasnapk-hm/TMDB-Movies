import {
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
  ADD_USER,
  REMOVE_USER,
} from "../../Constants/constants";
const initialState = {
  favorites: [],
  movies: [],
  genere: [],
  allmovies: [],
  generedetails: [],
  user: localStorage.getItem("User_ID"),
  loading: false,
  error: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        loading: false,
        genere: action.payload,
      };
    case FETCH_GENRES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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

    case FETCH_GENRESDATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GENRESDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        generedetails: action.payload,
      };
    case FETCH_GENRESDATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.some(
          (favorite) => favorite.id === action.payload.id
        )
          ? state.favorites
          : [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };

    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
