import { FETCH_COUNTRY, UPDATE_COUNTRY_BORDERS } from '../actions/types'

export default (state = null, action) => {
    switch(action.type) {
        case FETCH_COUNTRY:
            return action.payload;
        case UPDATE_COUNTRY_BORDERS:
            return {...state, borders: action.payload}
        default:
            return state;
    }
}