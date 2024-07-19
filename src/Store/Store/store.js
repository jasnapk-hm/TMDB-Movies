
import {createStore,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import Generereducer from '../Reducer/GenreReducer';


export const store = createStore( Generereducer
    
    ,applyMiddleware(thunk));
export default store;
