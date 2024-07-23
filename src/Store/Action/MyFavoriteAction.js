import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../Constants/constants';

export const addFavorite = (moviedata) => ({
  type: ADD_FAVORITE,
  payload: moviedata,
});

export const removeFavorite = (movieId) => ({
  type: REMOVE_FAVORITE,
  payload: movieId,
});

