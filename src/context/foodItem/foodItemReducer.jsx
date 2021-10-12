import {
    GET_FOOD_ITEMS,
    GET_RESTAURANT_FOOD_ITEMS,
    SET_TOTAL_FOODITEMS,
    GET_FOOD_ITEM,
    SET_LOADING
} from '../types'

export default (state, action) => {

    switch(action.type) {

        case GET_FOOD_ITEMS:
            return {
                ...state,
                foodItems: action.payload,
                loading: false
            }

        case GET_RESTAURANT_FOOD_ITEMS:
            return {
                ...state,
                restFoodItems: action.payload,
                loading: false
            }
        case SET_TOTAL_FOODITEMS:
            return {
                ...state,
                total: action.payload,
                loading: false
            }

        case GET_FOOD_ITEM:
            return {
                ...state,
                foodItem: action.payload,
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