import React, { useState, useContext, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom';
import Placeholder from '../../layouts/partials/Placeholder'
import Axios from 'axios'

import DashTopBar from './DashTopBar'

import storage from '../../helpers/storage';

import FoodModal from './FoodModal'
import AlertModal from '../../layouts/partials/AlertModal'
import DelModal from '../../layouts/partials/DelModal'
import EditMealModal from '../../layouts/partials/EditMealModal'

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
    const [showD, setShowD] = useState(false);
    const [showM, setShowM] = useState(false);
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

    const toggleDel = () => {
        setShowD(!showD)
    }
    
    const toggleEditMeal = () => {
        setShowM(!showM)
    }

    const barLinks = () => {

        return(
            <>
                <div className="ui-group-button">

                    <Link to="/dashboard/food-items/add" className="btn btn-sm btn-primary onwhite fs-15">Add Food</Link>

                </div>
            </>
        )

    }

    return (
        <>

            <DashTopBar linkComps={barLinks}  /> 

            <section>
                <main className="dash-inner">

                    <div className="container">

                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">{ foodItemContext.total }</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">{ !foodItemContext.loading ? foodItemContext.total : 0 } food items </p>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">{ foodItemContext.total }</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">{ !foodItemContext.loading ? foodItemContext.total : 0 } Status </p>
                                    </div>

                                </div>

                                </div>

                        </div>
                    
                        <div className="row">

                            <div className="col-md-12">

                                <div className="overview-box">

                                    <h2 className="font-helveticamedium fs-20 mb-4">Food Items</h2>

                                    <div className="ui-dashboard-card frnd-list">

                                        <table className="table custom-table  ">

                                            <thead>
                                                <tr className="font-helvetica">
                                                    <th>S/N</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helvetica">1</td>
                                                    <td className="font-helvetica">Rice and Chicken</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                    <td>
                                                        <div className="ui-group-button">
                                                            <Link 
                                                            onClick={toggleEditMeal}
                                                            className="text-primary">
                                                                <span className="fe fe-edit fs-16"></span>
                                                            </Link>
                                                            
                                                            <Link 
                                                            onClick={toggleDel}
                                                            className="text-danger">
                                                                <span className="fe fe-trash-2 fs-16"></span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">2</td>
                                                    <td className="font-helvetica">Beans and Bread</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                    <td>
                                                        <div className="ui-group-button del-btn">
                                                            <Link 
                                                            onClick={toggleEditMeal}
                                                            className="text-primary">
                                                                <span className="fe fe-edit fs-16"></span>
                                                            </Link>
                                                            
                                                            <Link 
                                                            onClick={toggleDel}
                                                            className="text-danger">
                                                                <span className="fe fe-trash-2 fs-16"></span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">3</td>
                                                    <td className="font-helvetica">Jollof and Chicken</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                    <td>
                                                        <div className="ui-group-button del-btn">
                                                            <Link 
                                                            onClick={toggleEditMeal}
                                                            className="text-primary">
                                                                <span className="fe fe-edit fs-16"></span>
                                                            </Link>
                                                            
                                                            <Link 
                                                            onClick={toggleDel}
                                                            className="text-danger">
                                                                <span className="fe fe-trash-2 fs-16"></span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">4</td>
                                                    <td className="font-helvetica">Plantains and Beans</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                    <td>
                                                        <div className="ui-group-button del-btn">
                                                            <Link 
                                                            onClick={toggleEditMeal}
                                                            className="text-primary">
                                                                <span className="fe fe-edit fs-16"></span>
                                                            </Link>
                                                            
                                                            <Link 
                                                            onClick={toggleDel}
                                                            className="text-danger">
                                                                <span className="fe fe-trash-2 fs-16"></span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">5</td>
                                                    <td className="font-helvetica">Rice and Beans</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                    <td>
                                                        <div className="ui-group-button del-btn">
                                                            <Link 
                                                            onClick={toggleEditMeal}
                                                            className="text-primary">
                                                                <span className="fe fe-edit fs-16"></span>
                                                            </Link>
                                                            
                                                            <Link 
                                                            onClick={toggleDel}
                                                            className="text-danger">
                                                                <span className="fe fe-trash-2 fs-16"></span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>
                            
                        </div>

                    </div>

                </main>

            </section>
        
            <AlertModal isShow={showAlert} closeModal={toggleAlert} type={msgModal.type} data={msgModal} />
            <DelModal isShow={showD} closeModal={toggleDel} />
            <EditMealModal isShow={showM} closeModal={toggleEditMeal} />
 
        </>
        
    )
}

export default FoodItems
