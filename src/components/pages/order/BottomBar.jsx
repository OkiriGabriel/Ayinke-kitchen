import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import colors from '../../helpers/colors'

import UserContext from '../../../context/user/userContext'

import storage from '../../helpers/storage'


const BottomBar = ({ plates, totalPrice, process, loading }) => {

    const userContext =  useContext(UserContext);

    const history = useHistory();
    
    useEffect( async () => {

    }, [])


    const fireProcess = (e) => {
        if(e) e.preventDefault();
        process(e)
    }

    const checkLogin = () => {

        if(storage.checkUserID() && storage.checkRestaurantID() && storage.checkToken() && 
        (storage.getUserID().toString() === storage.getRestaurantID().toString())){
            return true;

        }else{

            return false;

        }

    }


    return (
        <>

            <footer>
                <div id="bottom-bar" className="bottom-bar">

                    <div className="bar-food">
                        <p className="mrgb0">
                            <span className="title font-metrolight fs-14 pdr">Total:</span>
                            <span className="title font-metrobold fs-15">&#x20A6;{ totalPrice }</span>
                        </p>
                    </div>

                    <div className="ml-auto">

                        <div className="bar-food">
                            {
                                loading ? (
                                    <>
                                        <Link className={`bar-fdbtn font-metromedium fs-14 onwhite disabled-show`} style={{backgroundColor: colors.primary.green}}>

                                            <img src="../../../images/assets/spinner-white.svg" alt="spinner" width="33px" />

                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link onClick={(e) => fireProcess(e)} className={`bar-fdbtn font-metromedium fs-14 onwhite ${ checkLogin() ? 'disabled' : '' }`} style={{backgroundColor: colors.primary.green}}>Order Now</Link>
                                    </>
                                )
                            }
                            
                        </div>

                    </div>

                </div>
            </footer>

        </>

    )

}

export default BottomBar;