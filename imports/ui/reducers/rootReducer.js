import { combineReducers } from 'redux';
import account from './accountReducer';
import serverError from './serverErrorReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  account,
  serverError,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer;
