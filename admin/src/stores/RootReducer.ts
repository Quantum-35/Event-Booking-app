import { combineReducers } from 'redux';

import authReducer from '../containers/Auth/reducer';
import eventReducer from '../containers/Events/reducer';

export default combineReducers({
    authReducer,
    eventReducer
});