import { combineReducers } from 'redux';
import countriesReducer from './countriesReducer';
import countryReducer from './countryReducer';

export default combineReducers({
    countries: countriesReducer,
    country: countryReducer
});