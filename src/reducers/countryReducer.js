import { FETCH_COUNTRY } from '../actions/types'

export default (state = null, action) => {
    switch(action.type) {
        case FETCH_COUNTRY:
            return action.payload;
        default:
            return state;
    }
}