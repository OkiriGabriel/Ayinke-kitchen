import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../layouts/partials/NavBar'
import Slider from '../layouts/partials/Slider';
import SearchBox from '../layouts/partials/SearchBox';
import Restaurant from '../layouts/partials/Restaurant'

import UserContext from '../../context/user/userContext';
import LocationContext from '../../context/location/locationContext';
import FoodContext from '../../context/food/foodContext'

const Home = (props) => {

    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const foodContext = useContext(FoodContext)

    const [empty, setEmpty] = useState(false);

    useEffect(() => {

        userContext.getRestaurants();
        locationContext.getLocations();
        foodContext.getAllFood(9999);
        displayEmpty();

    }, []);

    const displayEmpty = () => {
        setTimeout(() => {
            setEmpty(true);
        }, 5000);
    }

    return(
        <>  
                <NavBar position={true} />

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
         
{/* 
            <section className="list">

                <div className="container">

                    <div className="row">
                        <div className="col-lg-12">
                        <h3 className={!userContext.loading && userContext.restaurants.length > 0 ? 'title font-metromedium' : 'title ui-hide'}>Akinyemo's kitchen</h3>

                                {
                                    userContext.loading && locationContext.loading &&
                                    <>
                                        <div className="load--bx">

                                            {
                                                empty ? (
                                                    <>
                                                        <img src="../../../images/assets/empty@cup.svg" className="empty" alt="empty cup" />
                                                        <div className="row ui-text-center pdr4 pdl4 mrgt1">
                                                            <p className="onsilver">There are currently no restaurants with available food items. Check back soonest!</p>
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
    !userContext.loading && userContext.restaurants.length <= 0 && 
    <>
        <div className="load--bx">

            <img src="../../../images/assets/empty@cup.svg" className="empty" alt="empty cup" />
            <div className="row ui-text-center pdr4 pdl4 mrgt1">
                <p className="onsilver">There are currently no restaurants with available food items. Check back soonest!</p>
            </div>

        </div>
    </>
}

{

    !locationContext.loading && locationContext.locations.length > 0 &&
    !userContext.loading && userContext.restaurants.length > 0 &&
    userContext.restaurants.map((r, i) => 

        <>
            <Restaurant 
                logo={r.logo} 
                name={r.resturantName} 
                locations={locationContext.locations} 
                address={r.addresses[0]} 
                phone={r.phoneNumber} 
                restId={r.username ? r.username : r._id} 
                user={r}
            />
            <div className="ui-line bg-silverlight" />
        </>
    )
}
                        </div>
                    </div>
                </div>

            </section>
             */}
        </>
    )

}

export default Home;