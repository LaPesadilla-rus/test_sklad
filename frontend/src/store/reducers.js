import {combineReducers} from 'redux';
import {relationReducer} from './relation/reducers';

export default combineReducers({
    relation: relationReducer,
});