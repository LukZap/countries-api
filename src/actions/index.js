import { FETCH_COUNTRIES, FETCH_COUNTRY } from './types';
import countriesApi from '../api/countriesApi'

export const fetchCountries = (type, query) => async (dispatch, getState) => {
    const state = getState();
    if(state.countries.searchType === type && state.countries.searchQuery === query) {
        return;
    }
    
    let response;
    try {
        if(!query || !type) {
            response = await countriesApi.get('/all');
        } else if (type === 'region') {
            response = await countriesApi.get(`/region/${query}`);
        } else if (type === 'name') {
            response = await countriesApi.get(`/name/${query}`);
        }
    
        dispatch({
            type: FETCH_COUNTRIES,
            payload: {
                searchType: type,
                searchQuery: query,
                countries: response.data,
            }
        });
    } catch {
        dispatch({
            type: FETCH_COUNTRIES,
            payload: {
                searchType: type,
                searchQuery: query,
                countries: null,
            }
        });
    }

};

export const fetchCountry = name => async (dispatch, getState) => {
    const state = getState();

    // check if current country is already in store
    if(state.country && state.country.name === name)
        return;

    dispatch({
        type: FETCH_COUNTRY,
        payload: null
    });

    // check if current country is already in list of countries in store
    let country;
    const countryFromList = state.countries.countries.find(x => x.name === name);
    if(countryFromList) {
        country = {...countryFromList}
    } else {
        try {
            const responseCountry = await countriesApi.get(`/name/${name}`);
            country = responseCountry.data[0];
        } catch {
            return;
        }
    }

    // fetch full country names for border badges
    const borders = country.borders;
    if (borders && borders.length > 0) {
        const codes = borders.join(',');
        const responseCodes = await countriesApi.get(`/alpha?codes=${codes}`);
        country.borders = responseCodes.data.map(x => x.name)
    }

    dispatch({
        type: FETCH_COUNTRY,
        payload: country
    });
};