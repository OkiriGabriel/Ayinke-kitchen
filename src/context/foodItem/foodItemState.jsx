import React, { useReducer, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import FoodItemContext from './foodItemContext';
import FoodItemReducer from './foodItemReducer';

import storage from '../../components/helpers/storage';

import {
    GET_FOOD_ITEMS,
    GET_RESTAURANT_FOOD_ITEMS,
    SET_TOTAL_FOODITEMS,
    GET_FOOD_ITEM,
    SET_LOADING
} from '../types'

const FoodItemState = (props) => {

    const initialState = {
        foodItems: [],
        total: '0',
        restFoodItems: [],
        foodItem: {},
        loading: false,
    }

    const history = useHistory();

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }
    
    const [state, dispatch] = useReducer(FoodItemReducer, initialState);

    const logout = async () => {

        localStorage.clear();
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

        history.push('/login')

    }

    const getFoodItems = async() => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/food-items`, config)
            .then((resp) => {

                dispatch({
                    type: GET_FOOD_ITEMS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get food items ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get food items ${err}`)
        }

    }

    const getFoodItem = async(id) => {

        setLoading();

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/food-items/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_FOOD_ITEM,
                    payload: resp.data.data
                });

            }).catch((err) => {

                if(err.response.data.status === 401){
                    logout()
                }else{

                    console.log(`Error! Could not get food item ${err}`)
                    
                }

            })
            
        } catch (err) {
            console.log(`Error! Could not get food item ${err}`)
        }

    }

    const getRestFoodItems = async(id, loc) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/food-items/restaurant/${id}${loc && loc !== '' ? '?location=' + loc : ''}`, config)
            .then(async (resp) => {
                
                if(resp.data.error === false && resp.data.data.length > 0){

                    await localStorage.removeItem('foodItems');
                    localStorage.setItem('foodItems', JSON.stringify(resp.data.data));

                    dispatch({
                        type: GET_RESTAURANT_FOOD_ITEMS,
                        payload: resp.data.data
                    });

                    dispatch({
                        type: SET_TOTAL_FOODITEMS,
                        payload: resp.data.total
                    });

                }

            }).catch(async (err) => {

                if(err.response.data.errors[0] === 'cannot find location'){

                    await localStorage.removeItem('foodItems');
                    localStorage.setItem('foodItems', '');

                    dispatch({
                        type: GET_RESTAURANT_FOOD_ITEMS,
                        payload: []
                    });

                }

                console.log(`Error! Could not get restaurant food items ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get restaurant food items ${err}`)
        }

    }


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <FoodItemContext.Provider
        value={{
            foodItems: state.foodItems,
            foodItem: state.foodItem,
            restFoodItems: state.restFoodItems,
            total: state.total,
            loading: state.loading,
            getFoodItems,
            getFoodItem,
            getRestFoodItems
        }}
    >
        {props.children}
    </FoodItemContext.Provider>

}

export default FoodItemState;