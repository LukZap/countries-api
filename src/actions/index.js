import { FETCH_COUNTRIES, FETCH_COUNTRY, SEARCH_COUNTRIES } from './types';
import countriesApi from '../api/countriesApi'

export const fetchCountries = continent => async dispatch => {
    let response;
    if (continent) {
        response = await countriesApi.get(`/region/${continent}`);
    } else {
        response = await countriesApi.get('/all');
    };

    dispatch({
        type: FETCH_COUNTRIES,
        payload: response.data
    });
};

export const searchCountries = searchQuery => async dispatch => {
    const response = await countriesApi.get(`/name/${searchQuery}`);

    dispatch({
        type: SEARCH_COUNTRIES,
        payload: response.data
    });
};

export const fetchCountry = name => async dispatch => {
    const responseCountry = await countriesApi.get(`/name/${name}`);
    const country = responseCountry.data[0];

    const borders = country.borders;
    if (borders && borders.length > 0) {
        const codes = borders.join(';');
        const responseCodes = await countriesApi.get(`/alpha?codes=${codes}`);
        country.borders = responseCodes.data.map(x => x.name)
    }

    dispatch({
        type: FETCH_COUNTRY,
        payload: country
    });
};