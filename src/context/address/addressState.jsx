import React, { useReducer, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import AddressContext from './addressContext';
import AddressReducer from './addressReducer';

import {
    GET_ADDRESSES,
    GET_RESTAURANT_ADDRESSES,
    ADD_RESTAURANTS_ADDRESSES,
    GET_ADDRESS,
    SET_LOADING
} from '../types'

const AddressState = (props) => {

    const initialState = {
        addresses: [],
        restAddresses: [],
        address: {},
        loading: false
    }

    const history = useHistory();
    
    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }
    
    const [state, dispatch] = useReducer(AddressReducer, initialState);

    const logout = async () => {

        localStorage.clear();
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

        history.push('/login')

    }

    const getAddresses = async() => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/addresses`,config)
            .then((resp) => {

                dispatch({
                    type: GET_ADDRESSES,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get addresses ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get addresses ${err}`)
        }

    }

    const getAddress = async(id) => {

        setLoading();

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/addresses/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_ADDRESS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                
                if(err.response.data.status === 401){
                    logout()
                }else{

                    console.log(`Error! Could not get food item ${err}`)
                    
                }

            })
            
        } catch (err) {
            console.log(`Error! Could not get address ${err}`)
        }

    }

    const getRestAddresses = async(id) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/addresses/restaurant/${id}`, config)
            .then((resp) => {

                dispatch({
                    type: GET_RESTAURANT_ADDRESSES,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get restaurant addresses ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get restaurant addresses ${err}`)
        }

    }

    const addRestAddresses = async(id) => {
        setLoading()

        try {
            await Axios.post(`${process.env.REACT_APP_API_URI}/addresses/restaurant/${id}`, config)
            .then((resp) => {
                dispatch({
                    type: ADD_RESTAURANTS_ADDRESSES,
                    payload: resp.data.data
                })
            }).catch((err) => {
                console.log(`Error! Could not add restaurant addresses ${err}`)
            })
        } catch(err) {
            console.log(`Error! Could not add restaurant addresses ${err}`)

        }
    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <AddressContext.Provider
        value={{
            addresses: state.addresses,
            address: state.address,
            restAddresses: state.restAddresses,
            loading: state.loading,
            getAddresses,
            getAddress,
            getRestAddresses,
            addRestAddresses
        }}
    >
        {props.children}
    </AddressContext.Provider>

}

export default AddressState;