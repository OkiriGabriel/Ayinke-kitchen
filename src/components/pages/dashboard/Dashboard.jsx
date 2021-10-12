import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import storage from '../../helpers/storage';

import BottomBar from './BottomBar'
import TopBar from './TopBar'
import BottomNav from './BottomNav';
import OverView from './OverView'
import FoodItem from './FoodItem'
import Placeholder from '../../layouts/partials/Placeholder'

import FoodModal from './FoodModal'
import AlertModal from '../../layouts/partials/AlertModal'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'

import scroller from '../../helpers/scroller';


const Dashboard = () => {

    const history = useHistory();

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showStat, setShowStat] = useState(false);
    const [sLoading, setSLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [empty, setEmpty] = useState(false);
    const eL = [1,2];
    const [msgModal, setMessage] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: ''
    });

    const [foodItemList, setFoodItemList] = useState([]);

    useEffect(async () => {

        fetchDefaults();
         displayEmpty();

        await doScroll();

    }, [])

    const fetchDefaults = async () => {

        if(storage.checkToken()){
            userContext.getUser();
         }

        if(storage.checkUserID()){
            locationContext.getLocations();
            addressContext.getRestAddresses(storage.getUserID());
            foodContext.getAllFood(9999);
            foodItemContext.getRestFoodItems(storage.getUserID());
        }

    }

    const doScroll = () => {
        if(foodItemContext.loading === false){
            scroller.initScroll('foodl')
        }
    }

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 4000);
    }
    

    return(
        <>
            <TopBar userLoading={userContext.loading} user={userContext.user} />

            <main className="dash-inner">
                <OverView foodItems={foodItemContext.total} addresses={addressContext.restAddresses.length} />

                <section className="ord-ovw">
                    <div className="container">
                        <div className="ui-dashboard-card">
                            <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-one.svg")'}}>

                                <h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
                                    Your Orders
                                </h3>

                                <p className="onmineshaft fs-14 text-trunt mt-2 mb-2">Track orders from your customers, see new orders.</p>

                                <Link className="ui-upcase brand-orange fs-11 font-weight-bold">
                                    View Orders
                                    <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </section> 

                <div className="ui-separate-xsmall"></div>

                <section className="ord-ovw">
                    <div className="container">
                        <div className="ui-dashboard-card">
                            <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-sub.svg")'}}>

                                <h3 className="fs-16 mrgb0 font-weight-bold mb-1" style={{color: '#257324'}}>
                                    Free Plan
                                </h3>

                                <Link className="ui-upcase onapple fs-11 font-weight-bold">
                                    Upgrade Now
                                    <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </section> 

                <div className="ui-separate-xsmall"></div>

                <section className="mng-bx">
                    
                    <div className="container">

                        <h3 className="onmineshaft fs-14 mrgb1 mt-1">Manage your restaurant</h3>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-one.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Food Items</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-two.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add More Addresses</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-three.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Managers</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>
                        

                    </div>
                    
                </section>  

            </main>

            <BottomNav />
           
        </>
    )

}

export default Dashboard;