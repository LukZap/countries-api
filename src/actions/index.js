import { FETCH_COUNTRIES } from './types';
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