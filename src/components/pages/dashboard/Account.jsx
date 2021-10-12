import React, {useEffect, useState, useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Alert from '../../layouts/partials/Alert'

import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import BottomBar from './BottomBar'
import TopBar from './TopBar'
import Details from './Details'
import Address from './Address'
import storage from '../../helpers/storage';

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'


import FoodModal from './FoodModal'
import AddressesModal from './AddressesModal'
import AddressDetails from './AddressDetails'
import Placeholder from '../../layouts/partials/Placeholder';
import UnameModal from './UnameModal';

import scroller from '../../helpers/scroller';

const Account = (props) => {

    const inputFile = useRef(null);

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [show, setShow] = useState(false);
    const [showU, setShowU] = useState(false);
    const [imgSource, SetImageSource] = useState('');
    const [dpFile, setDpFile] = useState();
    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: ''
    })

    useEffect(async () => {

        fetchDefaults();
        
        await doScroll();

    }, [])

    const toggleUModal = (e) => {
        if(e){
            e.preventDefault();
        }
        setShowU(!showU);
    }


    const fetchDefaults = async () => {

        if(storage.checkToken()){
           await userContext.getUser();
         }

        if(storage.checkUserID()){
            locationContext.getLocations();
            addressContext.getRestAddresses(storage.getUserID());
            foodContext.getAllFood();
            foodItemContext.getRestFoodItems(storage.getUserID());
        }

    }

    const doScroll = () => {
        if(foodItemContext.loading === false){
            scroller.initScroll('addl')
        }
    }

    const openDialog = async (e) => {
        e.preventDefault();
        inputFile.current.click();
    }

    const toggleAdd = (e) =>{
        if(e){
            e.preventDefault();
        }
        setShow(!show)
    }

    const getImageSource = (file) => {
    
        let reader = new FileReader();
        reader.onloadend = (e) => {
            SetImageSource(e.target.result);
            setDpFile(reader.result);

            uploadImage(e.target.result, userContext.user._id);
        };
        reader.readAsDataURL(file);
      
    }

    const browseFile = (e, type) => {
        
        if (e.target.files && e.target.files[0]) {
    
            if (e.target.files[0].size > 5000000) {
                // return alert here
            }

            getImageSource(e.target.files[0], type);
            
        }
    }

    const uploadImage = async (image, id) => {

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

            const data = {
                file: image,
                fileName: userContext.user.resturantName
            }

            
            await Axios.put(`${process.env.REACT_APP_API_URL}/users/upload-logo/${id}`, data, config)
            .then(async (resp) => {

                if(resp.data.data.logo === true){
                    setAData({...aData, show: true, type: 'success', message: resp.data.data.message});
                    setTimeout(() => {
                        setAData({...aData, show: false});
                    }, 1500);

                    await userContext.getUser();
                    
                }

                console.log(resp);
        

            }).catch(err => {
                console.log(err);
            })

    }


// fcf3ed
    return (
        <>
            <TopBar userLoading={userContext.loading} user={userContext.user} />

            <div className="ui-text-center rt--bx">

                <div className="dp--bx">
                    <input type="file" className="ui-hide" ref={inputFile} onChange={(e) => browseFile(e)} accept="image/x-png,image/jpg,image/jpeg,image/png" />
                    <span className={`edit ${imgSource ? 'round' : ''}`}>
                        <Link onClick={(e) => openDialog(e)} to=""><i className="fe fe-edit-3"></i></Link>
                    </span>
                    {
                        userContext.user.logo &&
                        <>
                            {
                                imgSource &&
                                <img src={imgSource} alt="avatar" />
                            }{
                                !imgSource &&
                                <img src={userContext.user.logo === 'no-logo.jpg' ? '../../../images/assets/avatar-bag.svg' : userContext.user.logo} alt="avatar" />
                            }
                        </>
                    }
                    {
                       !userContext.user.logo && 
                       <>
                            {
                                imgSource &&
                                <img src={imgSource} alt="avatar" />
                            }
                            {
                                !imgSource &&
                                <img src="../../../images/assets/avatar-bag.svg" alt="avatar" />
                            }
                       </>
                    }
                </div>

                <h3 className="mrgb0 onmineshaft fs-20 font-weight-bold">
                    {
                        userContext.loading &&
                        <Placeholder width="100px" backgroundColor="#f7cfb5" />
                    }{
                        !userContext.loading &&
                        <> { userContext.user ? userContext.user.resturantName : 'No Name'  } </>
                    }
                </h3>
                <p class="mrgb0 ui-text-center text-muted fs-14 mt">
                    {
                        userContext.loading &&
                        <Placeholder width="8 0px" backgroundColor="#f7cfb5" />
                    }
                    {
                        !userContext.loading && userContext.user && userContext.user.username &&
                        <> 
                            <a href={`https://checkaam.com/${userContext.user.username}`} target="_blank" className="brand-orange fs-13 font-weight-medium">www.checkaam.com/{ userContext.user.username }</a>
                        </>
                    }
                    {
                        !userContext.loading && userContext.user && !userContext.user.username &&
                        <> 
                            <Link onClick={(e) => toggleUModal(e)} to="" className="brand-orange fs-13 font-weight-medium">Add Username</Link>
                        </>
                    }
                    
                </p>

            </div>

            <div className="dash-tab">

                <Tabs defaultTab='one' onChange={(tabId) => { }}>

                    <TabList className="">
                        <Tab onClick={(e) => e.preventDefault() } tabFor="one" className="font-gilroymedium ">
                            <span className="fs-14">Details</span>
                        </Tab>
                        <Tab onClick={(e) => e.preventDefault() } tabFor="three" className="font-gilroymedium ">
                            <span className="fs-14">Adverts</span>
                        </Tab>
                        <Tab onClick={(e) => e.preventDefault() } tabFor="four" className="font-gilroymedium">
                            <span className="fs-14">Plan</span>
                        </Tab>
                        <Tab onClick={(e) => e.preventDefault() } tabFor="two" className="font-gilroymedium ">
                            <span className="fs-14">Locations</span>
                        </Tab>
                    </TabList>

                    <TabPanel tabId="one">
                        <div className="container">
                            <Details user={userContext.user} userLoading={userContext.loading}  />
                        </div>
                    </TabPanel>

                    <TabPanel tabId="two">
                        
                    <>
                        <div className="addresses dash mrgt2">

                            <div className="container">

                            <div className="d-flex align-items-center food-items add-list">
                                <h3 className="title fs-18 mrgb0">Addresses</h3>
                                <Link onClick={(e) => toggleAdd(e)} className="add-btn ml-auto">
                                    <span className="fe fe-plus"></span>
                                </Link>
                            </div>

                                <div id="addl" className="list-box">

                                    {
                                        !addressContext.loading &&
                                        addressContext.restAddresses.map((ad, i) => 
                                            <Address loading={locationContext.loading} address={ad} addresses={addressContext.restAddresses} />
                                        )
                                    }

                                </div>
                                
                            </div>

                        </div>
                    </>

                    </TabPanel>

                    <TabPanel tabId="three">
                        <div className="dash-empty">

                            <div className="pdl3 pdr3 ui-text-center">

                                <img src="../../../images/assets/icon@ad.svg" width="110px" alt="ad" />
                                <p className="text-muted fs-14 ui-text-center mrgb1 mrgt2">Running Ads on Checkaam is currently unavailable. Please check back later</p>

                            </div>

                        </div>
                    </TabPanel>

                    <TabPanel tabId="four">

                        <div className="container">

                             <div className="dash-empty">

                                <div className="pdl3 pdr3 ui-text-center">

                                    <h3 className="mrgb0 onmineshaft fs-20 font-weight-bold">Plan: Free</h3>
                                    <p class="mrgb0 ui-text-center">
                                        <span className="text-muted fs-14 onmineshaft">Status: </span>
                                        <span className="text-muted fs-14 onapple font-weight-bold">Active </span>
                                    </p>

                                </div>

                            </div>

                        </div>

                    </TabPanel>
                    
                </Tabs>

            </div>

            
            <BottomBar />

            <AddressesModal isShow={show} closeModal={toggleAdd} />
            <UnameModal isShow={showU} closeModal={toggleUModal} user={userContext.user} />
        </>

    )

}

export default Account;