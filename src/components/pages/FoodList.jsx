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
    const [filter, setFilter] = useState(false)
    const [empty, setEmpty] = useState(false);
    const [locName, setLocName] = useState('')

    
    const [selected, setSelected] = useState({
        count: 0,
        total: 0,
        items: []
    })


    const selectFood = async (e, data) => {

       
    }

    const getSelected = (val) => {

        setEmpty(false);
        setSelected({ ...selected, count: 0, total: 0, items: [] })
       
        setLocName(val.label)

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

                    {/* <Alert show={aData.show} type={aData.type} message={aData.message} /> */}

                 <div className="">
                    <div className="row food-disp pub">
                        <>
                            <FoodItem selectFood={selectFood} />
                            {/* <Food food={f} selectFood={selectFood} loading={locationContext.loading} bg={ colors.accents[i] } index={i} locations={locationContext.locations} foodItem={f} /> */}
                        </>    

                    </div>
                </div>

            </div>

                <BottomBar   count={selected.count} total={selected.total} items={selected.items} />
            
        </>
    )

}

export default Home;