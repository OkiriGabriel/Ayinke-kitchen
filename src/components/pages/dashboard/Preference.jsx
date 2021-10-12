import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import storage from '../../helpers/storage';

import UserContext from '../../../context/user/userContext';
import AddressContext from '../../../context/address/addressContext';
import FoodContext from '../../../context/food/foodContext';
import FoodItemContext from '../../../context/foodItem/foodItemContext';
import LocationContext from '../../../context/location/locationContext';

import TopBar from './TopBar'
import scroller from '../../helpers/scroller';
import BottomNav from './BottomNav';
import Placeholder from '../../layouts/partials/Placeholder';

import UnameModal from './UnameModal';
import NumberModal from './NumberModal';
import CouponModal from './CouponModal';

const Preference = ({ user, userLoading }) => {

    const history = useHistory();

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [show, setShow] = useState(false);
    const [showN, setShowN] = useState(false);
    const [showC, setShowC] = useState(false)
    const [empty, setEmpty] = useState(false);
    

    useEffect(async () => {
        
        fetchDefaults();
        displayEmpty();

        await doScroll();

    }, [])

    const toggleUpdateName = (e) => {
        
        if (e) {
            e.preventDefault();
        };

        setShow(!show)

    }
    
    const toggleNModal = (e) => {
        
        if (e) {
            e.preventDefault();
        };

        setShowN(!showN)

    }
    
    const toggleCModal = (e) => {
        
        if (e) {
            e.preventDefault();
        };

        setShowC(!showC)

    }

    const fetchDefaults = async () => {

        if (storage.checkToken()) {
            userContext.getUser();
        }

        if (storage.checkUserID()) {
            locationContext.getLocations();
            addressContext.getRestAddresses(storage.getUserID());
            foodContext.getAllFood(9999);
            foodItemContext.getRestFoodItems(storage.getUserID());
        }

    }

    const doScroll = () => {
        if (foodItemContext.loading === false) {
            scroller.initScroll('foodl')
        }
    }

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 4000)
    }

    return (
        <>

        <TopBar userLoading={userContext.loading} user={userContext.user} />

        <main className="dash-inner mrgt5">

            <h1 className="brand-orange fs-18 font-weight-bold mrgb1" style={{marginTop: '5rem'}}>Preferences</h1>


            <div className="mng-bx">

                <div className="container">

                    <div className="prf-item shadow-bx">


                                <h2 className="mrgb0 font-weight-medium onmineshaft fs-14">
                                    Username
                                </h2>

                                <p className="mrgb0 font-weight-medium onsilver fs-13 mt-1">
                                    Customers find you easily with username.
                                </p>

                                <div className="d-flex align-items-center mt-2 mb-2">

                                    <a href={`https://www.checkaam.com/${userContext.user.username ? userContext.user.username : ''} `} className="fs-14 font-weight-normal brand-orange">
                                        {
                                            userLoading &&
                                            <Placeholder width='40px' />
                                        }
                                        {
                                            !userLoading && 
                                            <> 
                                                {
                                                    userContext.user.username ? `@${userContext.user.username}` : ''
                                                }
                                            </>
                                        }
                                    </a>
                                

                                    <Link onClick={(e) => toggleUpdateName(e)} className="ml-auto brand-orange" style={{position: 'relative', top: '0px'}}>
                                        <span className="fe fe-edit-3 fs-14"></span>
                                    </Link>
                                </div>

                            </div>

                    <div className="prf-item shadow-bx">


                                <h2 className="mrgb0 font-weight-medium onmineshaft fs-14">
                                    WhatsApp Number
                                </h2>

                                <p className="mrgb0 font-weight-medium onsilver fs-13 mt-1">
                                    Customers can engage you on whatsapp
                                </p>

                                <div className="d-flex align-items-center mt-2 mb-2">

                                    <a href={`https://wa.me/${userContext.user.whatsappNumber ? userContext.user.whatsappNumber : ''} `} className="fs-14 font-weight-normal brand-orange">
                                        {
                                            userLoading &&
                                            <Placeholder width='40px' />
                                        }
                                        {
                                            !userLoading &&
                                            <>{
                                                userContext.user.whatsappNumber ? userContext.user.whatsappNumber : ''
                                            }</>
                                        }
                                    </a>
                                

                                    <Link onClick={(e) => toggleNModal(e)} className="ml-auto brand-orange" style={{position: 'relative', top: '0px'}}>
                                        <span className="fe fe-edit-3 fs-14"></span>
                                    </Link>
                                </div>

                            </div>

                    <div className="prf-item shadow-bx">


                                <h2 className="mrgb0 font-weight-medium onmineshaft fs-14">
                                    Coupon code
                                </h2>

                                <p className="mrgb0 font-weight-medium onsilver fs-13 mt-1">
                                    Give your customers discount.
                                </p>

                                <div className="d-flex align-items-center mt-2 mb-2">

                                    <a href="" className="fs-14 font-weight-normal brand-orange">DMWLUCOSE</a>
                                

                                    <Link onClick={(e) => toggleCModal(e)} className="ml-auto brand-orange" style={{position: 'relative', top: '0px'}}>
                                        <span className="fe fe-edit-3 fs-14"></span>
                                    </Link>
                                </div>

                            </div>

                    
                </div>

            </div>

        </main>

        <BottomNav />
            
        <CouponModal isShow={showC} closeModal={toggleCModal} user={userContext.user} />
        <NumberModal isShow={showN} closeModal={toggleNModal} user={userContext.user} />
        <UnameModal isShow={show} closeModal={toggleUpdateName} user={userContext.user} />
        </>
    )
}

export default Preference;
