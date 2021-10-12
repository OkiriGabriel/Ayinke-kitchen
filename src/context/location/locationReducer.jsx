import {
    GET_LOCATIONS,
    GET_LOCATION,
    GET_RESTAURANT_DELIVERY,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch(action.type) {

        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload,
                loading: false
            }

        case GET_LOCATION:
            return {
                ...state,
                location: action.payload,
                loading: false
            }

        case GET_RESTAURANT_DELIVERY:
            return {
                ...state,
                delivery: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}