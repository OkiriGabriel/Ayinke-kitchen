import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage';

import BottomNav from './BottomNav'
import TopBar from './TopBar'

import OverView from './OverView'
import FoodItem from './FoodItem'
import Placeholder from '../../layouts/partials/Placeholder'

import PlanModal from './PlanModal';

import UserContext from '../../../context/user/userContext'

const Subsription = () => {

    const userContext = useContext(UserContext);

    const [show, setShow] = useState(false);

    useEffect(async () => {

    
       
   }, []);

   const fetchDefaults = async () => {

        if(storage.checkToken()){
            userContext.getUser();
        }
    }

    const toggleModal = (e) => {
        if(e){
            e.preventDefault();
        }
        setShow(!show)
    }

    return (
        <>

            <TopBar userLoading={userContext.loading} user={userContext.user} />

            <section className="ui-full-bg-norm  ">

                <div className="ui-wrapper-xxlarge">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-4 mx-auto ui-text-center ref-prog">
                                
                                <div>

                                    <div className="container">

                                        <div className="row plan">

                                            <div className="col-sm-7">

                                                <div className="pln-bx">

                                                    <div className="mrgb ui-text-center" style={{color: '#257324'}}>
                                                        <span className="fs-12 ui-upcase font-weight-bold">Free Plan</span>
                                                    </div>

                                                    <div className="ui-text-center">
                                                        <span className="fs-12 onapple">We offer you all services for free!</span>
                                                    </div>

                                                </div>

                                            </div>
                                            
                                            <div className="col-sm-7">

                                                <div className="pln-bx">

                                                    <div className="mrgb ui-text-center">
                                                        <span className="fs-12 ui-upcase brand-orange font-weight-bold">Free Plan</span>
                                                    </div>

                                                    <div className="ui-text-center">
                                                        <span className="fs-12 brand-orange">We offer you all services for free!</span>
                                                    </div>

                                                </div>

                                            </div>
                                            
                                            <div className="col-sm-9 mrgb">

                                                <div className="pln-bx">

                                                    <div className="mrgb ui-text-center" style={{color: '#257324'}}>
                                                        <span className="fs-12 ui-upcase  font-weight-bold">Premium Plan</span>
                                                    </div>

                                                    <div className="ui-text-center">
                                                        <span className="fs-12 onapple">We offer you all services for free!</span>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className=" mrgt1">
                                    <h2 className=" onblacklight fs-25">Subscribe!</h2>
                                    <p className="onsilver fs-14">There are currently no referals available now. Check back soonest! You will get an update when its available. Thank you</p>
                                </div>

                                <div className="mrgb1">
                                    <Link onClick={(e) => {toggleModal(e)}} to="" className="brand-orange fs-15">Check plans</Link>
                                </div>

                                <Link to="" className="btn btn-lgr btn-lg onwhite bg-brand-orange fs-16 mb-3">Subscribe</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BottomNav />

            <PlanModal isShow={show} closeModal={toggleModal} user={userContext.user} />
            
        </>
    )
}

export default Subsription;
