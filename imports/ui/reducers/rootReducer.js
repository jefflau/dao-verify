import { combineReducers } from 'redux';
import account from './accountReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  account,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer;
