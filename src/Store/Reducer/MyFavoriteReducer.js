import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../Constants/constants";

const initialState = {
  favorites: [],
};

const myFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default myFavoriteReducer;
