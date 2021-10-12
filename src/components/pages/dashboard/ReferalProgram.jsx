import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage';

import BottomNav from './BottomNav'
import TopBar from './TopBar'

import OverView from './OverView'
import FoodItem from './FoodItem'
import Placeholder from '../../layouts/partials/Placeholder'

import FoodModal from './FoodModal'
import AlertModal from '../../layouts/partials/AlertModal'

import UserContext from '../../../context/user/userContext'

const ReferalProgram = () => {

    const userContext = useContext(UserContext);

    useEffect(async () => {

    
       
   }, []);

   const fetchDefaults = async () => {

    if(storage.checkToken()){
        userContext.getUser();
     }
}

    return (
        <>

<TopBar userLoading={userContext.loading} user={userContext.user} />



            <section className="ui-full-bg-norm  ">

                <div className="ui-wrapper-xxlarge">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-4 mx-auto ui-text-center ref-prog">
                            <img src="../../../images/assets/empty@cup.svg" alt="avatar" />


                            <div className=" mrgt1">
                            <h2 className=" onblacklight fs-25">Comming Soon!</h2>
                                <p className="onsilver fs-14">There are currently no referals available now. Check back soonest! You will get an update when its available. Thank you</p>
                            </div>

                            <Link to="/dash" className="btn btn-lgr btn-lg onwhite bg-brand-orange fs-16 mb-3">Go back</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BottomNav />
            
        </>
    )
}

export default ReferalProgram
