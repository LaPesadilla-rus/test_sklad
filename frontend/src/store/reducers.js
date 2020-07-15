import {combineReducers} from 'redux';
import {relationReducer} from './relation/reducers';
import { authReducer} from './auth/reducers';
import { loaderReducer } from './loader/reducers';
import { messageReducer } from './message/reducers';

export default combineReducers({
    relation: relationReducer,
    auth: authReducer,
    loader: loaderReducer,
    message: messageReducer,
});