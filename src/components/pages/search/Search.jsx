import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../layouts/partials/NavBar'
import SearchBox from '../../layouts/partials/SearchBox';
import BottomBar from '../../layouts/partials/BottomBar'

import UserContext from '../../../context/user/userContext';
import FoodContext from '../../../context/food/foodContext';
import AddressContext from '../../../context/address/addressContext'
import LocationContext from '../../../context/location/locationContext';
import FoodItemContext from '../../../context/foodItem/foodItemContext';

import Placeholder from '../../layouts/partials/Placeholder';
import storage from '../../helpers/storage'

const Search = (props) => {

    const userContext = useContext(UserContext);
    const foodContext = useContext(FoodContext);
    const addressContext = useContext(AddressContext)
    const locationContext = useContext(LocationContext);
    const foodItemContext = useContext(FoodItemContext);

    const [empty, setEmpty] = useState(false);
    const [show, setShow] = useState(false);
    const [blink, setBlink] = useState(false)
    const [params, setParams] = useState({
        food: '',
        location: '',
        restaurant: ''
    });

    useEffect(() => {

        foodContext.getAllFood();
        locationContext.getLocations();

        initSearch();
        displayEmpty();

    }, []);

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 2000);
    }

    const initSearch = () => {
        
        if(storage.checkSearchQuery()){

            const query = JSON.parse(storage.getSearchQuery());
            userContext.search(query);

            // const qstr = props.match.params.query.split('&');
            const qstr = storage.getQueryParams().split('&');
            setParams({...params, food: qstr[0].split('=')[1], location: qstr[1].split('=')[1], restaurant: qstr[2].split('=')[1]})

        }else{
            
        }
    }

    const openAddress = (e, restId) => {
        e.preventDefault();
        addressContext.getRestAddresses(restId);
        if(!addressContext.loading){
            setShow(!show);
        }
        
    }
    const getFood = (id) => {
        const food = foodContext.allFood.find(fd => fd._id === id);
        return food;
    }

    const formatData = (items, userId) => {
        let avArr;

        if(!foodContext.loading){
            
            const parts = params.food.split(' ');
            const qLoc = JSON.parse(storage.getSearchQuery());

            if(qLoc !== undefined || qLoc !== '' || qLoc || qLoc !== null){

                if(qLoc.location){
                    avArr = items.filter(m => {
                        const food = getFood(m.food);
                        if(food && m.location === qLoc.location && food.type === parts[0] && food.name === parts[1]){
                            return m;
                        }else {
                            return null;
                        }
                    });
                }else if(qLoc.restaurant){

                    avArr = items.filter(m => {
                        const food = getFood(m.food);
                        if(food && food.type === parts[0] && food.name === parts[1]){
                            return m;
                        }else{
                            return null;
                        }
                    });

                }

            }else{
                avArr = items.filter(m => {
                    const food = getFood(m.food);
                    if(m.createdBy === userId && food.type === parts[0] && food.name === parts[1]){
                        return m;
                    }
                });
            }

            return avArr[0] ? {status: avArr[0].status, availableBy: avArr[0].availableBy } : {status: false, availableBy: '' };
           
        }

        
    }

    const getLoc = (id) => {
        
        const loc = locationContext.locations.find((l) => l._id === id);
        return loc.name ? loc.name : '';
    }



    return(
        <> <NavBar position={true} />
        
   
            <section className="hero homee-hero ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/bg@back-two.jpg")'}}>
                
                <div className="container-fluid flex-heightt food">
                    <div className="ui-wrapper-mini">

                        <div className="">

                            <div className="row">

                                <div data-aos={"fade-right"} className="col-md-6 mx-auto">
                                    
                                {
                                        !locationContext.loading && !foodContext.loading &&
                                        !userContext.loading && userContext.restaurants.length > 0 &&
                                        <div className="">
                                            <SearchBox foodOptions={foodContext.allFood} locations={locationContext.locations} />
                                        </div>
                                    }
                                    
                                </div>

                            
                            </div>

                        </div>

                    </div>
                </div>
            </section>
         

            <section className="list fd-itm mrgt2">

                <div className="container">

                    <h3 className="title mrgb0 font-metromedium">Search results</h3>
                    <p className="mrgb2 fs-13 text-muted font-metrolight">
                        {`Looking for ${params.food} 
                        ${ params.location && !params.restaurant ? 'at ' + params.location : '' } 
                        ${ !params.location && params.restaurant ? 'at ' + params.restaurant : '' }
                        ${ params.location && params.restaurant ? 'at ' + params.location + params.restaurant : '' }`}
                    </p>

                    {
                        userContext.loading && userContext.searchResults.length <= 0 &&
                        <>
                            <div className="load--bx">
                                <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                            </div>
                        </>
                    }

                    {
                        !userContext.loading && userContext.searchResults.length <= 0 &&
                        <>
                            <div className="load--bx">

                                {
                                    empty ? (
                                        <>
                                            <img src="../../../images/icons/dplate-c.svg" width="90px" alt="icon"/>
                                            
                                            <div className="row ui-text-center pdr4 pdl4 mrgt1 fs-16">
                                                <p className="onmineshaft font-metromedium">There are currently no restaurants with available food items. Check back soonest!</p>
                                            </div>
                                        </>
                                    ) : (
                                        <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                                    )
                                }

                            </div>
                        </>
                    }

                    

                    {
                        !userContext.loading && userContext.searchResults.length > 0 &&
                        <>
                            {
                                userContext.searchResults.map((data) => 

                                <>
                                    <div className="">

                                        <div className="restaurant details ui-box-shadow-dark-light">

                                            <div className="avatar">
                                            {
                                                data.logo && data.logo !== 'no-logo.jpg' &&
                                                <img src={data.logo} alt="rest logo" />
                                            }
                                            {
                                                (!data.logo || data.logo === 'no-logo.jpg') &&
                                                <img src="../../../images/assets/avatar-bag.svg" alt="rest logo" />
                                            }
                                            </div>

                                            <div className="details">

                                            <p className="title">
                                                { !data.resturantName && <Placeholder width="150px" /> }
                                                {  data.resturantName ? data.resturantName : '' }
                                            </p>
                                            
                                            <p className="address">
                                                { !data.phoneNumber && <Placeholder width="100px" /> }
                                                <span> { data.phoneNumber ? data.phoneNumber : '' }</span>
                                            </p>

                                            <div className="text-muted pdl">
                                                &nbsp;
                                                <span className="fs-13">{params.food} </span>
                                                <span className={`fs-13 ${ formatData(data.foodItems, data._id).status ? 'success' : formatData(data.foodItems, data._id).availableBy ? 'onblue' : 'error' }`}>
                                                    {formatData(data.foodItems, data._id).status ? 'is available' : formatData(data.foodItems, data._id).availableBy ? 'ready by ' + formatData(data.foodItems, data._id).availableBy : 'unavailable'}
                                                </span>
                                                {/* <span >
                                                    { formatData(data.foodItems, data._id).status }
                                                </span> */}
                                            </div>

                                        </div>

                                            <div className="ml-auto pdr1 ui-group-button">

                                                <Link onClick={(e) => openAddress(e, data._id)} to="" className="blink">
                                                    { 
                                                        blink ? (<></>) : (<span className="blink-circle init-blink"></span>)                                    
                                                    }  
                                                    <span className="fe fe-map-pin brand-orange fs-24"> </span>
                                                </Link>

                                                <a href={`tel: ${userContext.restaurant.phoneNumber}`}><span className="fe fe-phone onapple fs-24"></span></a>

                                            </div>
                                      
                                        </div>
                                        

                                    </div>
                                    

                                    <div className="mb-3 mt-2"></div>
                                    
                                    <div className={`address-box ${show ? 'open' : 'close'} ui-box-shadow-dark-light`}>

                                        <div className="container">

                                            <div className="d-flex align-items-center">
                                                <h3 className="title fs-18 mrgb1">Addresses</h3>
                                                <div className="ml-auto">
                                                    <Link onClick={(e) => openAddress(e)} style={{position:'relative', top: '-5px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                                                </div>
                                            </div>
                                            
                                            {
                                                !addressContext.loading && addressContext.restAddresses.length > 0 &&
                                                addressContext.restAddresses.map((ad, i) =>

                                                    <>
                                                        <div className="add-item">

                                                            <div className="d-flex align-items-center">
                                                                <p className="title onmineshaft fs-14 mrgb0">{ad.phoneNumber ? ad.phoneNumber : '080XXXXXXXX' }</p>
                                                                <p className="mrgb0 onmineshaft fs-14 font-weight-medium pdl1"> <span className="fe fe-map-pin"></span> { !locationContext.loading ? getLoc(ad.location) : '' } </p>
                                                                
                                                            </div>
                                                            <p className="mrgb0 text-muted">{ad.address} </p>

                                                        </div>

                                                        <div className="ui-line add bg-silverlight" />

                                                    </>

                                                )
                                                
                                            }

                                        </div>

                                    </div>

                                </>

                                 
                                
                                )
                            }
                            
            
                        </>
                    }

                    
                   
                </div>

            </section>

            
            <BottomBar />
        </>
    )

}

export default Search;