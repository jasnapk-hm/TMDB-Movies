import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../Reducer/GenreReducer";
import myFavoriteReducer from "../Reducer/MyFavoriteReducer";
import movieDetailsReducer from "../Reducer/MovieDetailReducer";
import trendingMoviesReducer from "../Reducer/TrendingMoviesReducer";

const reducers = combineReducers({
  favorites: myFavoriteReducer,
  genere: rootReducer,
  movies: movieDetailsReducer,
  allMovie: trendingMoviesReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
export default store;
