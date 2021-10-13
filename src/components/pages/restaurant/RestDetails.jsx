import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../layouts/partials/NavBar'
import Slider from '../../layouts/partials/Slider';
import SearchBox from '../../layouts/partials/SearchBox';
import Restaurant from '../../layouts/partials/Restaurant'

import UserContext from '../../../context/user/userContext';
import FoodContext from '../../../context/food/foodContext';
import AddressContext from '../../../context/address/addressContext'
import LocationContext from '../../../context/location/locationContext';
import FoodItemContext from '../../../context/foodItem/foodItemContext';

import Placeholder from '../../layouts/partials/Placeholder'
import FoodItem from './FoodItem';
import Food from './Food';
import BottomBar from '../../layouts/partials/BottomBar';
import storage from '../../helpers/storage';
import scroller from '../../helpers/scroller';

import colors from '../../helpers/colors'
import Alert from '../../layouts/partials/Alert'
import Dropdown from '../../layouts/partials/DropDown'

import { useRefresh } from '../../helpers/AutoRefresh'

const RestDetails = (props) => {

    const userContext = useContext(UserContext);
    const foodContext = useContext(FoodContext);
    const addressContext = useContext(AddressContext)
    const locationContext = useContext(LocationContext);
    const foodItemContext = useContext(FoodItemContext);

    const restId = props.match.params.id;

    const [show, setShow] = useState(false);
    const [empty, setEmpty] = useState(false);
    const eL = [1,2];
    const [blink, setBlink] = useState(false)
    const [foodItems, setItems] = useState([])
    const [showSearch, setShowSearch] = useState(false);
    const [filter, setFilter] = useState(false)
    const [locName, setLocName] = useState('')

    const [selected, setSelected] = useState({
        count: 0,
        total: 0,
        items: []
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    useEffect(async () => {

        // setShow(true);

        await userContext.getRestaurant(restId);
        foodContext.getAllFood(9999);
        foodItemContext.getRestFoodItems(storage.checkHex(restId) ? restId : storage.checkRestaurantID() ? storage.getRestaurantID() : restId);
        addressContext.getRestAddresses(storage.checkHex(restId) ? restId : storage.checkRestaurantID() ? storage.getRestaurantID() : restId);
        locationContext.getLocations();

        displayEmpty()
        initBlink();

        // await doScroll();

    }, []);

    const doScroll = () => {
        if(foodItemContext.loading === false){
            scroller.initScroll('pubfood')
        }
    }

    const checkErr = () => {
        setAData({...aData, show: true, type: 'danger', message: `You cannot order food from different locations.`});
        setTimeout(() => {
            setAData({...aData, show: false});
        },3500);
    }

    const toggleSearch = (e) => {
        if(e) e.preventDefault();
        setShowSearch(!showSearch);
    }

    const selectFood = async (e, data) => {

        if(e) e.preventDefault();

        if(data.action === 'add'){

            setSelected({ ...selected, count: selected.count + 1, total: selected.total + data.price, items: selected.items.concat(data.item) })

        }
        
        if(data.action === 'remove'){

            // remove item from array
            const currItems = selected.items;
            const itemIndex = currItems.findIndex((f) => f.foodId === data.item[0].foodId);
            currItems.splice(itemIndex, 1);

            // set the global plate data to empty if all food items is removed
            if(currItems.length === 0){
                await userContext.setPlateData({ items: [], restaurant: '' });
            }

            setSelected({ ...selected, count: selected.count - 1, total: selected.total - data.price, items: currItems })
        }
    }

    // refresh data every 5 seconds
    // useRefresh(async () => {
    //     await setItems(storage.getFoodItems());
    //     foodItemContext.getRestFoodItems(storage.checkHex(restId) ? restId : storage.checkUserID() ? storage.getUserID() : restId);
    // }, 30000)

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 2000);
    }

    const initBlink = () => {
        setTimeout(() => {
            setBlink(true);
        }, 20000)
    }

    const openAddress = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    const getLoc = (data) => {

        let name = '';
        if(!locationContext.loading && data.location){

            const loc = locationContext.locations.find((l) => l._id === data.location);
            name = loc.name;
        }
        return name;
    }

    const getFood = (id) => {

        const data = {
            name: 'food',
            type: 'type'
        }

        let i = 0;
        if(foodContext.allFood.length > 0){
            const food = foodContext.allFood.find(f => f._id === id);
            
            if(!food) {
                console.log('food not found', i);
            }else{
                data.name = food.name;
                data.type = food.type;
            }
        }

        return data;
        
    }

    const formatList = (data) => {

        const list = data.map((item) => {
            item.foodName = getFood(item.food).type + ' ' + getFood(item.food).name;
            return item;
        });

        return list;

    }

    const search = async (e) => {

        let currentList = [];
        let newList = [];

        if(e.target.value !== ''){

            currentList = formatList(foodItemContext.restFoodItems);
            newList = currentList.filter((fd) => {

                const c = fd.foodName.toLowerCase();
                const f = e.target.value.toLowerCase();

                if(c.includes(f) !== null){
                    return c.includes(f)
                }

            })

        }else{
            newList = formatList(foodItemContext.restFoodItems);
        }

        setItems(newList)

    }

    const getLocations = () => {
        
        const loc = locationContext.locations.map((l) => {
            const c ={
                value: l._id,
                label: l.name,
                left: '',
                image: ''
            }
            return c;
        });

        const all = {
            value: '',
            label : 'All',
            left: '',
            image: ''
        }

        loc.unshift(all)

        return loc;
    }

    const getSelected = (val) => {

        setEmpty(false);
        setSelected({ ...selected, count: 0, total: 0, items: [] })
        foodItemContext.getRestFoodItems(storage.checkHex(restId) ? restId : storage.checkRestaurantID() ? storage.getRestaurantID() : restId, val.value);
        setFilter(true);
        setLocName(val.label)

    }


    return(
        <>
            <NavBar />

            <section className="hero homee-hero ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/bg@back-two.jpg")'}}>
                
                <div className="container-fluid flex-heightt food">
                    <div className="ui-wrapper-mini">

                        <div className="">

                            <div className="row">

                                <div data-aos={"fade-right"} className="col-md-7 mx-auto">
                                    
                               
                                        <div className="">
                                            <SearchBox foodOptions={foodContext.allFood} locations={locationContext.locations} />
                                        </div>
                             
                                    
                                </div>

                            
                            </div>

                        </div>

                    </div>
                </div>
            </section>
         

                {
                    !userContext.loading && storage.checkObject(userContext.restaurant) <= 0 && 
                    <>
                        <div className="load--bx food-empty mrgt5">

                            <img src="../../../images/assets/empty@cup.svg" className="empty" alt="empty cup" />
                            <div className="row ui-text-center pdr4 pdl4 mrgt1">
                                <p className="onmineshaft fs-14 mrgt2 font-metromedium">Restaurant not found! Are you sure the username is correct?</p>
                            </div>

                        </div>  
                    </>  
                }

                {
                    !userContext.loading && storage.checkObject(userContext.restaurant) > 0 && 
                    <section className="list fd-itm">

                        <div className="container">

                            <div className="restaurant details">

                                <div className="details">

                                    <p className="title font-metromedium fs-15 mt-2" style={{color: colors.primary.green}}>
                                        { !userContext.restaurant.resturantName && <Placeholder width="150px" /> }
                                        { userContext.restaurant.resturantName ? userContext.restaurant.resturantName : '' }
                                    </p>

                                    {
                                        !addressContext.loading && addressContext.restAddresses.length > 0 &&
                                        <p className="address font-metromedium">
                                            <>
                                                { getLoc(addressContext.restAddresses[0]) }
                                                <span className={`${userContext.restaurant.isOpen ? 'onapple ' : 'onaliz'} fs-11 font-metromedium`} style={{position: 'relative', top: '1px'}}>&nbsp;&nbsp;{ userContext.restaurant.isOpen ? 'Open' : 'Closed'} &nbsp;</span>
                                            </>
                                        </p>
                                    }
                                    
                                    

                                </div>

                                <div className="ml-auto pdr1 ui-group-button mt-2">

                                    <Link onClick={(e) => openAddress(e)} to="" className="blink">
                                        { 
                                            blink ? (<></>) : (<span className="blink-circle init-blink"></span>)                                    
                                        }  
                                        <span className="fe fe-map-pin brand-orange fs-20"> </span>
                                    </Link>

                                    <a href={`tel: ${userContext.restaurant.phoneNumber}`} style={{position: 'relative', right: '-4px'}}><span className="fe fe-phone onapple fs-20"></span></a>

                                    {/* <a className="wapi-btn" href={`https://wa.me/${userContext.restaurant.whatsappNumber}`} target="_blank">
                                        <span  className=" fs-24">
                                            <img src="../../../images/assets/icon@whatsapp.svg" width="25px" />
                                        </span>
                                    </a> */}

                                </div>

                        </div>
                    
                            

                            <div id="pubfood" className="food-items mrgt1 mrgb">

                                <div className="d-flex align-items-center mrgb1">

                                    <h3 className="title fs-15 font-metrolight mrgb0" style={{color: colors.primary.green}}>Food Items</h3>
                                    
                                    {/* <Link className="ml-auto srch-link" onClick={(e) => toggleSearch(e)}>
                                        <span className="fs-20 chk-icon" style={{position: 'relative', top: '0px'}}>
                                            <img src="../../../images/icons/dsearch.svg" className="icon"/>
                                        </span> 
                                    </Link> */}

                                    {/* <Link className="ml-auto ftr-link" onClick={(e) => toggleSearch(e)} style={{position: 'relative', top: '-2px'}}>
                                        <span className="font-metromedium onmineshaft fs-14 pdr">Filter</span>
                                        <span className="fs-20 chk-icon" style={{position: 'relative', top: '1px'}}>
                                            <img src="../../../images/icons/filter.svg" className="icon"/>
                                        </span> 
                                    </Link> */}

                                    <Dropdown className="ftr-drop" options={getLocations} selected={getSelected} placeholder={`filter`} search={false}  />

                                </div>

                                {
                                    showSearch &&
                                    <>
                                        <form className="gnr-form mrgb1" onSubmit={(e) => e.preventDefault()}>

                                            <div className="form-group mrgb0">
                                            <input 
                                                onChange={(e) => search(e)}
                                                type="text" 
                                                className="form-control font-metrolight fs-13" 
                                                placeholder="Find food item" />
                                            </div>

                                        </form>    
                                    </>
                                }

                                <Alert show={aData.show} type={aData.type} message={aData.message} />


                                {
                                    foodItemContext.loading && !filter && foodItemContext.restFoodItems.length <= 0 && 
                                    <>
                                        {
                                            empty ?
                                            (<>
                                                <div className="load--bx food-empty">

                                                    <img src="../../../images/assets/empty@cup.svg" className="empty" alt="empty cup" />
                                                    <div className="row ui-text-center pdr4 pdl4 mrgt1">
                                                        <p className="onsilver">{userContext.restaurant.resturantName} does not have any food items</p>
                                                    </div>

                                                </div>
                                            </>) 
                                            : (
                                               <>
                                                <div className="load--bx food-empty">
                                                    <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                                                </div>
                                               </>
                                            )
                                        }    
                                    </>  
                                }

                                {
                                    foodItemContext.loading && filter && 
                                    <>
                                        <div className="load--bx food-empty">
                                            <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                                        </div>   
                                    </>  
                                }

                                {
                                    !foodItemContext.loading && filter && foodItemContext.restFoodItems.length <= 0 && 
                                    <>
                                        <div className="load--bx food-empty">

                                            <img src="../../../images/icons/dplate-c.svg" className="empty mrgt2" alt="empty plate" />
                                            <div className="row ui-text-center pdr4 pdl4 mrgt1 font-metromedium">
                                                <p className="onmineshaft">{userContext.restaurant.resturantName} does not have any food items at { locName } </p>
                                            </div>

                                        </div>  
                                    </>  
                                }

                                
                                <div className="row food-disp pub mrgb2">

                                        {
                                            !foodItemContext.loading && foodItemContext.restFoodItems.length > 0 && foodItems.length <=0 &&
                                            foodItemContext.restFoodItems.map((f, i) =>

                                                <>
                                                    <FoodItem food={f} selectFood={selectFood} loading={locationContext.loading} bg={ colors.accents[i] } index={i} locations={locationContext.locations} foodItem={f} />
                                                </>

                                            )
                                            
                                        }

                                        {
                                            !foodItemContext.loading && foodItems.length > 0 &&
                                            foodItems.map((f, i) =>

                                                <>
                                                    <FoodItem food={f} selectFood={selectFood} loading={locationContext.loading} bg={ colors.accents[i] } index={i} locations={locationContext.locations} foodItem={f} />
                                                </>

                                            )
                                            
                                        }

                                </div>

                            </div>

                        </div>

                    </section>

                }

            
                <div className={`address-box ${show ? 'open' : 'close'} ui-box-shadow-dark-light`}>

                    <div className="container">

                        <div className="d-flex align-items-center">
                            <h3 className="title fs-16 mrgb1 font-metromedium" style={{color: colors.primary.green}}>Addresses</h3>
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
                                            {/* <p className="title onmineshaft fs-14 mrgb0 font-metrobold">{ad.phoneNumber ? ad.phoneNumber : '080XXXXXXXX' }</p> */}
                                            <p className="mrgb0 onmineshaft fs-14 font-weight-medium font-metrolight"> 
                                                <span className="fe fe-map-pin"></span> { !locationContext.loading ? getLoc(ad) : '' } 
                                            </p>
                                            
                                        </div>
                                        <p className="mrgb0 text-muted font-metromedium">{ad.address} </p>

                                    </div>

                                    <div className="ui-line add bg-silverlight" />

                                </>

                            )
                            
                        }

                    </div>

                </div>

            <BottomBar check={checkErr} count={selected.count} total={selected.total} items={selected.items} restId={userContext.restaurant._id} />
            
        </>
    )

}

export default RestDetails;