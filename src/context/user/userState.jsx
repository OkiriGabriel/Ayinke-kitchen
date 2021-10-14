import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import UserContext from './userContext';
import UserReducer from './userReducer';

import storage from '../../components/helpers/storage';

import {
    GET_LOGGEDIN_USER,
    GET_RESTAURANTS,
    GET_RESTAURANT,
    GET_SEARCH_RESULTS,
    SET_USER_PLATE_DATA,
    GET_CUSTOMER_BILLINGS,
    GET_CUSTOMER_CARDS,
    SET_LOADING,
    UNSET_LOADING
} from '../types'

const UserState = (props) => {

    const initialState = {
        restaurants: [],
        user: {},
        cards: [],
        billings: [],
        restaurant: {},
        searchResults: [],
        plateData: [],
        loading: false
    }

    const history = useHistory();

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const logout = async () => {

        localStorage.clear();
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

        history.push('/login')

    }

    const getRestaurants = async() => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/users/restaurants`, config)
            .then((resp) => {

                dispatch({
                    type: GET_RESTAURANTS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get restaurants ${err}`)
                resetLoading();
            })
            
        } catch (err) {
            console.log(`Error! Could not get restaurants ${err}`)
            resetLoading();
        }

    }

    const search = async(query) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/users/search?food=${query.food}&location=${query.location}&resturantName=${query.restaurant.toString()}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_SEARCH_RESULTS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get search results ${err}`)
                resetLoading();
            })
            
        } catch (err) {
            console.log(`Error! Could not get search results ${err}`)
            resetLoading();
        }

    }

    const getRestaurant = async(id) => {

        setLoading();
        const url = storage.checkHex(id) ? `${process.env.REACT_APP_API_URL}/users/restaurants` : `${process.env.REACT_APP_API_URL}/users/find-by-username/${id}`;

        try {

            await Axios.get(url, config)
            .then((resp) => {
                
                dispatch({
                    type: GET_RESTAURANT,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get restaurant ${err}`)
                resetLoading();
            })
            
        } catch (err) {
            console.log(`Error! Could not get restaurant ${err}`)
            resetLoading();
        }

    }

    const getUser = async () => {

        setLoading()

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }


        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, config)
            .then((resp) => {

                dispatch({
                    type: GET_LOGGEDIN_USER,
                    payload: resp.data.data
                })

            }).catch((err) => {

                if(err.response.data.status === 401){
                    logout()
                }else{

                    console.log(`Error! Could not get logged in user ${err}`)
                    resetLoading();
                }
                
            })
            
        } catch (err) {
            console.log(`Error! Could not get logged in user ${err}`)
            resetLoading();
        }

    }

    const getBillings = async (id) => {

        setLoading()

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

        try {

            await Axios.get(`${process.env.REACT_APP_ORDER_URL}/customers/get-billings/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_CUSTOMER_BILLINGS,
                    payload: resp.data.data
                })

            }).catch((err) => {
            
                if(err.response.data.status === 401){
                    logout()
                }else{

                    console.log(`Error! Could not get logged in user ${err}`)
                    resetLoading();
                }

            })
            
        } catch (err) {
            console.log(`Error! Could not get logged in user billings ${err}`)
        }

    }

    const getCards = async (id) => {

        setLoading()

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }


        try {

            await Axios.get(`${process.env.REACT_APP_PAYMENT_URL}/customers/cards/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_CUSTOMER_CARDS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                
                if(err.response.data.status === 401){
                    logout()
                }else{

                    console.log(`Error! Could not get logged in user ${err}`)
                    resetLoading();
                }

            })
            
        } catch (err) {
            console.log(`Error! Could not get logged in user cards ${err}`)
        }

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }
    
    const resetLoading = () => {
        dispatch({
            type: UNSET_LOADING
        })
    }

    return <UserContext.Provider
        value={{
            restaurants: state.restaurants,
            restaurant: state.restaurant,
            searchResults: state.searchResults,
            user: state.user,
            loading: state.loading,
            plateData: state.plateData,
            billings: state.billings,
            cards: state.cards,
            getRestaurants,
            getRestaurant,
            getUser,
            search,
            getBillings,
            getCards
        }}
    >
        {props.children}
    </UserContext.Provider>

}

export default UserState;