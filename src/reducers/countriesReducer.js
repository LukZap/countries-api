import { FETCH_COUNTRIES } from '../actions/types'

const initialState = {
    searchType: null,
    searchQuery: null,
    countries: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COUNTRIES:
            return { 
                searchType: action.payload.searchType,
                searchQuery: action.payload.searchQuery,
                countries: action.payload.countries,
            }
        default:
            return state;
    }
}