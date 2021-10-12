import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import ReviewContext from './reviewContext';
import ReviewReducer from './reviewReducer';

import storage from '../../components/helpers/storage';

import {
    GET_RESTAURANT_REVIEWS,
    SET_LOADING
} from '../types'

const ReviewState = (props) => {

    const initialState = {
        reviews: [],
        loading: false
    }

    const history = useHistory();

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    
    const [state, dispatch] = useReducer(ReviewReducer, initialState);

    const logout = async () => {

        localStorage.clear();
        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

        history.push('/login')

    }

    const getReviews = async(restId) => {

        setLoading()

        try {

            await Axios.get(`${process.env.REACT_APP_API_URL}/reviews/restaurant/${restId}?sort=desc&limit=9999`, config)
            .then((resp) => {

                dispatch({
                    type: GET_RESTAURANT_REVIEWS,
                    payload: resp.data.data
                })

            }).catch((err) => {
                console.log(`Error! Could not get restaurant reviews ${err}`)
            })
            
        } catch (err) {
            console.log(`Error! Could not get restaurant reviews ${err}`)
        }

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return <ReviewContext.Provider
        value={{
            reviews: state.reviews,
            loading: state.loading,
            getReviews
        }}
    >
        {props.children}
    </ReviewContext.Provider>

}

export default ReviewState;