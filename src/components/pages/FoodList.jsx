import NavBar from '../layouts/partials/NavBar'
import OrderModal from './order/OrderModal';
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
import QModal from './order/QuantityModal';
import Food from '../pages/restaurant/Food';
import BottomBar from '../layouts/partials/BottomBar';
import storage from '../helpers/storage';
import scroller from '../helpers/scroller';


import colors from '../helpers/colors'
import Alert from '../layouts/partials/Alert'
import Dropdown from '../layouts/partials/DropDown'



const Home = () => {
    const [show, setShow] = useState(false);
    const [pricing, setPrincing] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        
    
        
    }, [])

                  
    const toggleModal = () => {
        setShow(!show);
    }


    const getSelected = (e, t, count, price, n) => {
        if(e) e.preventDefault();

        if(t === 'add'){
            setPrincing(pricing + parseInt(price))

            if(name !== ''){
                setName(name + ' + ' + n);
            }else{
                setName(name + n);
            }
            
        }

        if(t === 'sub'){
            
            setPrincing( parseInt(pricing - (count * price)))
            setName('');
        }
        
    } 

    const getCount = (e, type, p) => {
        
     
        if(e) e.preventDefault();

        if(type === 'add'){
            setPrincing(pricing + parseInt(p))
        }

        if(type === 'sub'){
            setPrincing(pricing - parseInt(p))
        }
        
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
                                   <button class="btn search-bx-btn font-helveticamedium fs-17" type="button">
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

                 <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="row food-disp pub">
                            <>
                            <FoodItem 
                                food="Rice + Beans"
                                imgSrc="../../images/assets/food-1.jpeg"
                                price="200" 
                                get={getSelected}
                                getCount={getCount}
                                
                                />


                                <FoodItem 
                                food="Jollof + Chicken"
                                imgSrc="../../images/assets/food-3.jpg"
                                price="5000" 
                                get={getSelected}
                                getCount={getCount}
                                />

                            <FoodItem 
                                id="2"
                                food="Rice + Beans"
                                imgSrc="../../images/assets/food-1.jpeg"
                                price="200" 
                                get={getSelected}
                                getCount={getCount}
                                />


                                <FoodItem 
                                food="Jollof + Chicken"
                                imgSrc="../../images/assets/food-3.jpg"
                                price="5000" 
                                get={getSelected}
                                getCount={getCount}
                                />


                            </>    
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="counter">
                        <h2 className="brandcox-firefly text-center onwhite font-helveticamedium mrgb2 fs-20">Total Cart</h2>

                        <div className="row">
                            {/* <div className="col-md-6">
                        <form className="foorm">
                                <div onClick={(e) => { dec(e) }} className="value-button" id="decrease" >-</div>
                                <input type="number" id="number" value={count} defaultValue={1} />
                                <div onClick={(e) => { inc(e) }} className="value-button" id="increase" >+</div>
                            </form>
                            </div> */}

                            <div className="col-md-12">
                            <div className="bar-food ml-auto">
                            <h2 className="title font-helveticabold onwhite  fs-13 pdr food-lit">Meal: {name}</h2>

                                <p className="mrgb0 ">
                                    <span className="title font-helveticabold onwhite  fs-13 pdr food-lit">Total:</span>
                                    <span className="title font-helveticabold onwhite fs-15 food-lit">&#x20A6; {' '} { pricing }</span>
                                </p>
                            </div></div>  
 
                        </div>
                      

                  

                            <button onClick={toggleModal}  className="btn btn-lg btn-block bg-oran mrgt1  onwhite">Checkout</button>
                        </div>
                    </div>
                </div>

            </div>
           
{/* 
            <footer>
                <div id="bottom-bar" className="bottom-bar food">

                    <div className="bar-food">
                        <Link  className="pdr1 mrl"><span className="fe fe-chevron-left fs-15" style={{color: colors.neutral.grey, position:'relative', top:'5px'}}></span></Link>
                        <img src="../../../images/icons/dfood2.svg" alt="food icon"/>
                        <sup className="fd-sup">{ count }</sup>
                    </div>

                    <div className="bar-food">
                        <p className="mrgb0">
                            <span className="title font-metrolight fs-14 pdr food-lit">Total:</span>
                            <span className="title font-metrobold fs-15 food-lit">&#x20A6;{ pricing.toFixed(2) }</span>
                        </p>
                    </div>

                    <div className="ml-auto">

                        <div className="bar-food">
                            <Link  onClick={toggleModal} className={`bar-fdbtn font-metromedium fs-14 onwhite  `} style={{backgroundColor: colors.primary.green}}>Proceed</Link>
                        </div> 

                    </div>

                </div>
            </footer>
 */}

            <OrderModal isShow={show}  closeModal={toggleModal} />
           
            
        </>
    )

}

export default Home;