import {
    GET_LOGGEDIN_USER,
    SET_USER_PLATE_DATA,
    GET_RESTAURANTS,
    GET_RESTAURANT,
    GET_SEARCH_RESULTS,
    GET_CUSTOMER_BILLINGS,
    GET_CUSTOMER_CARDS,
    SET_LOADING,
    UNSET_LOADING
} from '../types';


export default (state, action) => {

    switch(action.type){

        case GET_LOGGEDIN_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case SET_USER_PLATE_DATA: 
            return {
                ...state,
                plateData: action.payload,
                loading: false
            }

        case GET_RESTAURANTS: 
            return {
                ...state,
                restaurants: action.payload,
                loading: false
            }
        case GET_RESTAURANT: 
            return {
                ...state,
                restaurant: action.payload,
                loading: false
            }
        case GET_CUSTOMER_BILLINGS: 
            return {
                ...state,
                billings: action.payload,
                loading: false
            }
        case GET_CUSTOMER_CARDS: 
            return {
                ...state,
                cards: action.payload,
                loading: false
            }
        case GET_SEARCH_RESULTS: 
            return {
                ...state,
                searchResults: action.payload,
                loading: false
            }
            
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        case UNSET_LOADING: 
            return {
                ...state,
                loading: false
            }
        default: 
            return state;
    }

}