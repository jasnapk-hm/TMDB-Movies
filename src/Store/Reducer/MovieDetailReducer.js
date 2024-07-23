import {
  FETCH_MOVIEDETAILS_FAILURE,
  FETCH_MOVIEDETAILS_REQUEST,
  FETCH_MOVIEDETAILS_SUCCESS,
} from "../../Constants/constants";
const initialState = {
  movies: [],
  loading: false,
  error: false,
};

const movieDetailsReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default movieDetailsReducer;
