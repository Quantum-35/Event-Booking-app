import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';


const middleware = [logger, thunk];

const store = createStore(
    RootReducer,
    {}, // initial state
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;