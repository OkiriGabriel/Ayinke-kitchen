import React, { useReducer, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import LocationContext from './locationContext';
import LocationReducer from './locationReducer';

import {
    GET_LOCATIONS,
    GET_LOCATION,
    GET_RESTAURANT_DELIVERY,
    SET_LOADING
} from '../types'

const LocationState = (props) => {

    const initialState = {
        locations: [],
        location: {},
        delivery: {},
        loading: false
    }

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }
    const [state, dispatch] = useReducer(LocationReducer, initialState);

    const getLocations = async(limit) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/locations${limit ? '?limit='+limit : ''}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_LOCATIONS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get locations ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get locations ${err}`)
        }

    }

    const getLocation = async(id) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/locations/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_LOCATION,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get location ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get location ${err}`)
        }

    }

    const getDelivery = async(data) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/deliveries/get-price?user_id=${data.user}&location=${data.location}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_RESTAURANT_DELIVERY,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get delivery data ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get delivery data ${err}`)
        }

    }


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <LocationContext.Provider
        value={{
            locations: state.locations,
            location: state.location,
            loading: state.loading,
            delivery: state.delivery,
            getLocations,
            getLocation,
            getDelivery
        }}
    >
        {props.children}
    </LocationContext.Provider>

}

export default LocationState;