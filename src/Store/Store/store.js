
import {createStore,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import MovieReducer from '../Reducer/MovieReducer';
import Generereducer from '../Reducer/GenreReducer';

export const store = createStore( {
    
    movie:MovieReducer,
    genere:Generereducer
    }
    
    ,applyMiddleware(thunk));
export default store;
