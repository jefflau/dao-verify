import { combineReducers } from 'redux';
import visibilityFilter from './visibilityReducer';
import pageSkip from './pageSkipReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  visibilityFilter,
  pageSkip,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer;
