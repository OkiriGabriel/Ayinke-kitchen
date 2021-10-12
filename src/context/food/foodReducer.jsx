import {
    GET_ALL_FOOD,
    GET_FOOD,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch(action.type) {

        case GET_ALL_FOOD:
            return {
                ...state,
                allFood: action.payload,
                loading: false
            }

        case GET_FOOD:
            return {
                ...state,
                food: action.payload,
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