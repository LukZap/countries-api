import { FETCH_COUNTRIES, SEARCH_COUNTRIES } from '../actions/types'

export default (state = [], action) => {
    switch(action.type) {
        case SEARCH_COUNTRIES:
        case FETCH_COUNTRIES:
            return [...action.payload];
        default:
            return state;
    }
}