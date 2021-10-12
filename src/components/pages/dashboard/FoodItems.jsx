import React, { useState, useContext, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom';
import Placeholder from '../../layouts/partials/Placeholder'
import Axios from 'axios'


import FoodDetails from './FoodDetails'

import storage from '../../helpers/storage';

import BottomNav from './BottomNav'
import TopBar from './TopBar'
import OverView from './OverView'
import FoodItem from './FoodItem'


import FoodModal from './FoodModal'
import AlertModal from '../../layouts/partials/AlertModal'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'
import Dropdown from '../../layouts/partials/DropDown'

const FoodItems = (props) => {
    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const searchRef = useRef(null)

    const [show, setShow] = useState(false);
    const [showStat, setShowStat] = useState(false);
    const [sLoading, setSLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [filter, setFilter] = useState({
        filter: false,
        value: ''
    })
    const eL = [1,2];
    const [msgModal, setMessage] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: ''
    });

    const [foodItemList, setFoodItemList] = useState([]);

    useEffect(() => {

        fetchDefaults();
        displayEmpty();
        
    }, []);

    const fetchDefaults = async () => {

        if(storage.checkToken()){
            userContext.getUser();
         }

        if(storage.checkUserID()){
            locationContext.getLocations();
            addressContext.getRestAddresses(storage.getUserID());
            foodContext.getAllFood();
            foodItemContext.getRestFoodItems(storage.getUserID());
        }

    }

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 4000);
    }


    const logout = (e) => {
        e.preventDefault();
        
        localStorage.clear();
        props.history.push('/login');
    }

    const toggleAdd = (e) =>{
        if(e){
            e.preventDefault();
        }
        setShow(!show)
    }

    const toggleAlert = (e) =>{
        if(e){
            e.preventDefault();
        }
        setShowAlert(!showAlert)
    }

    const updateFoodStatus = async (foodId , status) => {
        setSLoading(true);

        await Axios.put(`${process.env.REACT_APP_API_URL}/food-items/restaurant/${foodId}`, {status: status}, storage.getConfigWithBearer())
        .then((resp) => {
            if(resp.data.error === false){
                setMessage({...msgModal, type:'success', title: 'Successful!', message: 'Food item status changed successfuly', buttonText: 'close'});
                toggleAlert();

                // get all food items again to update the page
                foodItemContext.getRestFoodItems(storage.getUserID(), filter.value);
                
                setSLoading(false);
            }
        })
        .catch((err) => {
            setMessage({...msgModal, type:'error', title: 'Error!', message: 'Cannot change food item.', buttonText: 'close'});
            toggleAlert();
            setSLoading(false);
        })
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
        setFoodItemList([])
        searchRef.current.value = '';

        foodItemContext.getRestFoodItems(storage.getUserID(), val.value);
        setFilter({ ...filter, filter: true, value: val.value });

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

    const search = (e) => {

        let currentList = [];
        let newList = [];

        if(e.target.value !== ''){

            currentList = formatList(foodItemContext.restFoodItems);

            newList = currentList.filter((i) => {

                const c = i.foodName.toLowerCase();
                const f = e.target.value.toLowerCase();

                if(c.includes(f) !== null){
                    return c.includes(f)
                }

            });

        }else{
            newList = formatList(foodItemContext.restFoodItems);
        }

        setFoodItemList(newList);

    }

    return (
        <>

            <TopBar userLoading={userContext.loading} user={userContext.user} />

            <div className="">

                <main className="dash-inner">

                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
        <h1 className="fs-30 brand-green font-metrobold mrgb0">{ foodItemContext.total }</h1>
        <p className="mrgb0 brand-green fs-13 font-metromedium">{ !foodItemContext.loading ? foodItemContext.total : 0 } food items in { !addressContext.loading ? addressContext.restAddresses.length : 0 } locations </p>
    </div>

                    <section className="ord-ovw">
        
                        <div className="food-items dash">

                            <div className="container">
                                <Link to="/dashboard/food-items/add" className="add-btn ml-auto">
                                    <span className="fe fe-plus"></span>
                                </Link>
                                <div className="d-flex align-items-center mrgb1 mrgt2">
                                    <h3 className="title fs-16 mrgb0 font-metromedium">Food Items</h3>

                                    <Dropdown className="ftr-drop" options={getLocations} selected={getSelected} placeholder={`filter`} search={false}  />
                                    
                                </div>

                                <form className="mrgb1 form-search" onSubmit={(e) => e.preventDefault()}>
                                    <span className="fe fe-search onsilver"></span>
                                    <input ref={searchRef} type="text" onChange={(e) => search(e)} className="form-control search-txt font-metrolight" placeholder="Search..." />
                                </form>

                                {
                                    foodItemContext.loading && !filter.filter && foodItemContext.restFoodItems.length <= 0 && 
                                    <>
                                        {
                                            empty ?
                                            (<>
                                                <div className="load--bx fd-page food-empty">

                                                    <img src="../../../images/icons/dplate-c.svg" className="empty" alt="empty plate" />
                                                    <div className="row ui-text-center pdr4 pdl4 mrgt1">
                                                        <p className="onsilver">No food items</p>
                                                    </div>

                                                </div>
                                            </>) 
                                            : (
                                            <>
                                                <div className="load--bx fd-page food-empty">
                                                    <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                                                </div>
                                            </>
                                            )
                                        }    
                                    </>  
                                }

                                {
                                    foodItemContext.loading && filter.filter && 
                                    <>
                                        <div className="load--bx fd-page food-empty">
                                            <img src="../../../images/assets/spinner.svg" className="spinner" alt="spinner" />
                                        </div>   
                                    </>  
                                }

                                {
                                    !foodItemContext.loading && filter.filter && foodItemContext.restFoodItems.length <= 0 &&
                                    <>
                                        <div className="load--bx fd-page food-empty">

                                            <img src="../../../images/icons/dplate-c.svg" className="empty" alt="empty plate" />
                                            <div className="row ui-text-center pdr4 pdl4 mrgt1">
                                                <p className="brand-green font-metromedium">There are no food items fo the filtered location.</p>
                                            </div>

                                        </div>  
                                    </>  
                                }

                                    {
                                        !foodItemContext.loading && foodItemContext.restFoodItems.length > 0 &&
                                        <>
                                        
                                            <div className="list-box">

                                                {
                                                    foodItemList.length > 0 && 
                                                    foodItemList.map((fd, i) =>
                                                    
                                                        <>
                                                            {
                                                                !foodContext.loading && !locationContext.loading &&
                                                                <FoodItem 
                                                                statusLoading={sLoading} 
                                                                updateStatus={updateFoodStatus} 
                                                                foodItem={fd} 
                                                                allFood={foodContext.allFood} 
                                                                addresses={addressContext.restAddresses}
                                                                locations={locationContext.locations} 
                                                                />
                                                            }
                                                        </>

                                                    )
                                                }

                                                {
                                                    foodItemList.length <= 0 && foodItemContext.restFoodItems.map((fd, i) => 
                                                        <>
                                                            {
                                                                !foodContext.loading && !locationContext.loading &&
                                                                <FoodItem 
                                                                statusLoading={sLoading} 
                                                                updateStatus={updateFoodStatus} 
                                                                foodItem={fd} 
                                                                allFood={foodContext.allFood} 
                                                                addresses={addressContext.restAddresses}
                                                                locations={locationContext.locations} 
                                                                />
                                                            }
                                                        </>
                                                    )
                                                }

                                            </div>
                                        
                                        </>
                                        
                                    }
                                
                            </div>

                        </div>
                    
                    </section>

                </main>


            </div>

            
            <BottomNav isFit={false} />
        
            <AlertModal isShow={showAlert} closeModal={toggleAlert} type={msgModal.type} data={msgModal} />
 
        </>
        
    )
}

export default FoodItems
