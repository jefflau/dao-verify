import { applyMiddleware, createStore, compose } from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//redux middleware
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './ui/reducers/rootReducer';

const logger = createLogger();
const middleware = [reduxThunk, logger];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default store;

export const history = syncHistoryWithStore(browserHistory, store);
