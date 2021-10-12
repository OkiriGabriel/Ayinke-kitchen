import { GET_RESTAURANT_REVIEWS, SET_LOADING } from '../../context/types'

export default (state, action) => {

    switch(action.type){

        case GET_RESTAURANT_REVIEWS: 
            return {
                ...state,
                reviews: action.payload,
                loading: false,
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