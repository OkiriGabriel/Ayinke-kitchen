// import React, { useEffect, useContext, useState, Fragment } from 'react';
// import { Link } from 'react-router-dom';

import NavBar from '../layouts/partials/NavBar'
// import Slider from '../layouts/partials/Slider';
// import SearchBox from '../layouts/partials/SearchBox';
// import Restaurant from '../layouts/partials/Restaurant'

// import UserContext from '../../context/user/userContext';
// import LocationContext from '../../context/location/locationContext';
// import FoodContext from '../../context/food/foodContext'
import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';


import Slider from '../layouts/partials/Slider';

import Restaurant from '../layouts/partials/Restaurant'

import UserContext from '../../context/user/userContext';
import FoodContext from '../../context/food/foodContext';
import AddressContext from '../../context/address/addressContext'
import LocationContext from '../../context/location/locationContext';
import FoodItemContext from '../../context/foodItem/foodItemContext';
import ReviewContext from '../../context/review/reviewContext';

import Placeholder from '../layouts/partials/Placeholder'
import FoodItem from '../pages/restaurant/FoodItem';
import Food from '../pages/restaurant/Food';
import BottomBar from '../layouts/partials/BottomBar';
import storage from '../helpers/storage';
import scroller from '../helpers/scroller';


import colors from '../helpers/colors'
import Alert from '../layouts/partials/Alert'
import Dropdown from '../layouts/partials/DropDown'



const Home = (props) => {

    const userContext = useContext(UserContext);
    const foodContext = useContext(FoodContext);
    const addressContext = useContext(AddressContext)
    const locationContext = useContext(LocationContext);
    const foodItemContext = useContext(FoodItemContext);
    const reviewContext = useContext(ReviewContext);

    const restId = props.match.params.id;

    const [show, setShow] = useState(false);
    const [empty, setEmpty] = useState(false);
    const eL = [1,2];
    const [blink, setBlink] = useState(false)
    const [foodItems, setItems] = useState([])
    const [showSearch, setShowSearch] = useState(false);
    const [filter, setFilter] = useState(false)
    const [locName, setLocName] = useState('')
    const [selectedTab, setSelectedTab] = useState('one');
    const [showNav, setShowNav] = useState(true);
    const [showReview, setshowReview] = useState(false);

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

        setSelectedTab(storage.fetch('detailsTab'));

        if(storage.fetch('detailsTab') === 'three'){
            reviewContext.getReviews(storage.getRestaurantID());
            toggleNav(null, false);
        }

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

            // // set the global plate data to empty if all food items is removed
            // if(currItems.length === 0){
            //     await userContext.setPlateData({ items: [], restaurant: '' });
            // }

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

    // const search = async (e) => {

    //     let currentList = [];
    //     let newList = [];

    //     if(e.target.value !== ''){

    //         currentList = formatList(foodItemContext.restFoodItems);
    //         newList = currentList.filter((fd) => {

    //             const c = fd.foodName.toLowerCase();
    //             const f = e.target.value.toLowerCase();

    //             if(c.includes(f) !== null){
    //                 return c.includes(f)
    //             }

    //         })

    //     }else{
    //         newList = formatList(foodItemContext.restFoodItems);
    //     }

    //     setItems(newList)

    // }

    // const getLocations = () => {
        
    //     const loc = locationContext.locations.map((l) => {
    //         const c ={
    //             value: l._id,
    //             label: l.name,
    //             left: '',
    //             image: ''
    //         }
    //         return c;
    //     });

    //     const all = {
    //         value: '',
    //         label : 'All',
    //         left: '',
    //         image: ''
    //     }

    //     loc.unshift(all)

    //     return loc;
    // }

    // const getSelected = (val) => {

    //     setEmpty(false);
    //     setSelected({ ...selected, count: 0, total: 0, items: [] })
    //     foodItemContext.getRestFoodItems(storage.checkHex(restId) ? restId : storage.checkRestaurantID() ? storage.getRestaurantID() : restId, val.value);
    //     setFilter(true);
    //     setLocName(val.label)

    // }

    const configTab = (e, sel) => {
        if(e) e.preventDefault();
        setSelectedTab(sel);
        storage.keep('detailsTab', sel);
    }

    const pickTab = (sel) => {

        if(sel === 'one' || sel === 'two' || sel === 'three'){
            return sel;
        }else{
            return 'one'
        }

    }

    const dupRating = (num) => {
        let result = [];
        for(let i = 0; i < num; i++){
            result.push(num[i]);
        }
        return result;
    }

    const toggleNav = (e, st) => {
        if(e) e.preventDefault();
        setShowNav(st);
    }

    const toggleReview = (e) => {
        if(e) e.preventDefault();
        setshowReview(!showReview);
    }
    return(
        <>  
                <NavBar position={true} />

            <section className="hero homee-hero ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/bg@back-two.jpg")'}}>
                
                <div className="container-fluid flex-heightt food">
                    <div className="ui-wrapper-mini">

                        <div className="">

                            <div className="row">

                            <div data-aos={"fade-right"} className="col-lg-6  col-lg-10 mx-auto">
                                    
              
                                    <div className="form-group">
                                    <input type="text" placeholder="search food of the day..." className="search"  
         
                                        // onChange={(e) => setQuery(e.target.value)} 
                                        // onKeyPress={search}           
                                        />
                                   <button class="btn search-bx-btn" type="button">
                                    Search
                                    </button>
                                    </div>
                                    
                                </div>
                            
                            </div>

                        </div>

                    </div>
                </div>
            </section>
         

         
            <div id="pubfood" className="food-items mrgt2  container">

                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                 <div className="">
                    <div className="row food-disp pub">

                            {
                                !foodItemContext.loading && foodItemContext.restFoodItems.length > 0 && foodItems.length <=0 &&
                                foodItemContext.restFoodItems.map((f, i) =>

                                    <>
                                        <FoodItem food={f} selectFood={selectFood} loading={locationContext.loading} bg={ colors.accents[i] } index={i} locations={locationContext.locations} foodItem={f} />
                                        {/* <Food food={f} selectFood={selectFood} loading={locationContext.loading} bg={ colors.accents[i] } index={i} locations={locationContext.locations} foodItem={f} /> */}
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
{
                showNav && 
                <BottomBar check={checkErr} count={selected.count} total={selected.total} items={selected.items} restId={userContext.restaurant._id} />
            }
        </>
    )

}

export default Home;