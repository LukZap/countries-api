import { FETCH_COUNTRIES, FETCH_COUNTRY } from './types';
import countriesApi from '../api/countriesApi'

export const fetchCountries = (continent) => async (dispatch) => {
    let response;
    if(continent) {
        response = await countriesApi.get(`/region/${continent}`);
    } else {
        response = await countriesApi.get('/all');
    };
    
    dispatch({
        type: FETCH_COUNTRIES,
        payload: response.data
    });
};

export const fetchCountry = (name) => async (dispatch) => {
    const response = await countriesApi.get(`/name/${name}`);
    
    dispatch({
        type: FETCH_COUNTRY,
        payload: response.data[0]
    });
};