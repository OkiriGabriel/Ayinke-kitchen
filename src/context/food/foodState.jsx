import React, { useReducer, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import FoodContext from './foodContext';
import FoodReducer from './foodReducer';

import {
    GET_ALL_FOOD,
    GET_FOOD,
    SET_LOADING
} from '../types'

const FoodState = (props) => {

    const initialState = {
        allFood: [],
        food: {},
        loading: false
    }

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    const history = useHistory();
    
    const [state, dispatch] = useReducer(FoodReducer, initialState);

    const logout = async () => {

        localStorage.clear();
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

        history.push('/login')

    }

    const getAllFood = async(limit) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/food${limit ? '?limit=' + limit : ''}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_ALL_FOOD,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get all food ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get food items ${err}`)
        }

    }

    const getFood = async(id) => {

        setLoading();

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/food/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_FOOD,
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

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <FoodContext.Provider
        value={{
            allFood: state.allFood,
            food: state.food,
            loading: state.loading,
            getAllFood,
            getFood
        }}
    >
        {props.children}
    </FoodContext.Provider>

}

export default FoodState;