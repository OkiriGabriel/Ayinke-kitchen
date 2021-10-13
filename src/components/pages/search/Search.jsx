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
         

  
        </>
    )

}

export default Search;