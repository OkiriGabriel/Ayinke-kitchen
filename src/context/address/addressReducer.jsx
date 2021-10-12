import {
    GET_ADDRESSES,
    GET_RESTAURANT_ADDRESSES,
    GET_ADDRESS,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch(action.type) {

        case GET_ADDRESSES:
            return {
                ...state,
                addresses: action.payload,
                loading: false
            }

        case GET_RESTAURANT_ADDRESSES:
            return {
                ...state,
                restAddresses: action.payload,
                loading: false
            }

        case GET_ADDRESS:
            return {
                ...state,
                address: action.payload,
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