import {combineReducers} from 'redux';
import {relationReducer} from './relation/reducers';
import { authReducer} from './auth/reducers';

export default combineReducers({
    relation: relationReducer,
    auth: authReducer
});