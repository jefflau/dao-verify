import { combineReducers } from 'redux';
import account from './accountReducer';
import config from './configReducer';
import serverError from './serverErrorReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  account,
  serverError,
  config,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer;
