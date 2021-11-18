import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../layouts/partials/NavBar';

import Footer from '../layouts/partials/Footer';
import UserContext from '../../context/user/userContext';
import LocationContext from '../../context/location/locationContext';
import FoodContext from '../../context/food/foodContext';
import Restaurant from '../layouts/partials/Restaurant'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

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


    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };




    return(
        <>

            <NavBar position={true} />
            
            <section className="hero home-hero ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/femoree-kn_ANxnwCQ0-unsplash2 (FILEminimizer).jpg")', backgroundSize: 'contain'}}>
                
                <div className="container flex-height home">
                    <div className="ui-wrapper-small">

                        <div className="">

                            <div className="row heading-content">

                                <div data-aos={"fade-right"} className="col-lg-7 col-md-7">
                                    
                                    {/* <h1  className="headline onwhite font-helveticabold fs-50 mrgt2">
                                       Welcome to <br /> Ayinke May - Kitchen
                                    </h1> */}
                                       <h1  className="headline onwhite font-helveticabold fs-50 mrgt2">
                                       Welcome to <br /> AyinkeMay Kitchen
                                    </h1>

                                    <div class="onwhite font-helveticamedium fs-17 intro" style={{lineHeight: '27px'}}>
                                       Home of Sumptuous, Healthy Meals
                                        {/*<br /> Facilis quam maxime amet sint? Perferendis placeat excepturi temporibus ut ea nesciunt!*/}
                                    </div>

                                    <div className="ui-group-button mrgt3">
                                        <Link to="/food-list" className="btn btn-big ghost onwhite ccblue bg-orange">Order Now</Link>
                                    
                                    </div>

                                    <div className="d-flex mrgt1">
                                         <div className="d-flex mt-5 mr-3">
                                            <li class="list-inline-item "><a href="/" target="_blank" class="ig link-underlined hover"><img src="../../../images/assets/paystack.svg" alt="" /></a></li>
                                            <p className="onwhite fs-12 font-helveticamedium mrgb0 text-gray">Pay with Paystack</p>
                                        </div>

                                    
                                    </div>
                                    

                                    {/* <ul class="social_media list-inline onwhite mrgt1">
                                        <li class="list-inline-item "><a href="" target="_blank" class="ig link-underlined hover"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                                        <li class="list-inline-item"><a href="" target="_blank" class="fb link-underlined hover"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                                        <li class="list-inline-item"><a href="" target="_blank" class="lkd link-underlined hover"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
                                    </ul> */}
                                    
                                </div>

                                {/* <div className="col-md-6"  data-aos={"fade-left"}>
                                   <div className="mrgt5">
                                    <img src="../../../images/assets/heroo.svg" alt="" />
                                   </div>
                                </div> */}
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            
                 
            <section id="details" className="ui-wrapper-large">
                <div className="container">

                    <div className="col-lg-10 col-md-12  mx-auto">

                        <div className="text-data ui-text-center mrgt" style={{lineHeight: '22px'}}>

                            <h3 className="fs-30 font-helveticabold brandccpurple mrgb2 how-w">How it Works</h3>

                            <div className="row">

                                <div className="col-md-4  col-6 mrgb1">

                                    <div className="learn">

                                        <div className="">
                                        <span className=" bg-brandccbluee ui-rounded">
                                            <img src="../../../../images/assets/dish.png"  width="60px"alt="" />
                                        </span>

                                            <h2 className="brandccpurple fs-20 font-helveticamedium mrgt1 how-it-works  ml-2 mrgb0">
                                                Choose Meals
                                            </h2>
                                            {/*<div className="mrgt">*/}
                                            {/*    <p className="brandccpurple fs-14 ui-text-center mt-4 font-helveticamedium  how-it-works-p"> Lorem, ipsum lorem oplodp dolor sit amet consectetur adipisicing</p>*/}
                                            {/*</div>*/}
                                        </div>


                                    </div>

                                </div>

                                <div className="col-md-4 mrgb1 col-6">

                                    <div className="learn">

                                        <div className="">
                                        <span className=" bg-brandccbluee ui-rounded">
                                            <img src="../../../../images/assets/your-location.png"  width="60px"alt="" />
                                        </span>
                                        <h2 className="brandccpurple fs-20 how-it-works font-helveticamedium mrgt1 ml-2 mrgb0">
                                            Set Delivery Location
                                            </h2>
                                        </div>

                                        {/*<div className="mrgt">*/}
                                        {/*    <p className="brandccpurple fs-14 ui-text-center mt-4 font-helveticamedium  how-it-works-p "> Lorem, ipsum dolor sit amet ipsum lorem  consectetur adipisicing</p>*/}
                                        {/*</div>*/}

                                    </div>

                                </div>

                                <div className="col-md-4  mrgb1">

                                    <div className="learn">

                                        <div className="">
                                        <span className=" bg-brandccbluee ui-rounded">
                                            <img src="../../../../images/assets/checkout.png"  width="60px"alt="" />
                                        </span>
                                        <h2 className="brandccpurple fs-20 font-helveticamedium mrgt1 how-it-works  ml-2 mrgb0">
                                               Order
                                            </h2>
                                        </div>
                                        {/*<div className="mrgt">*/}
                                        {/*<p className="brandccpurple fs-14 ui-text-center mt-4 how-it-works-p font-helveticamedium "> Lorem, ipsum dolor sit amet ipsum lorem oplodp dolor consectetur adipisicing</p>*/}
                                        {/*</div>*/}

                                    </div>

                                    </div>
                  


                            </div>

                        </div>

                        {/* <div id="course" className="learn msg mrgt2">
                            <div className="pdl1">
                                <p className="brandccpurple fs-17 font-helveticamedium mrgb0">
                                    Buy premium course for just $3
                                </p>
                            </div>

                            <div className="ml-auto">
                                <Link onClick={(e) => togglePay(e)} to="" className="btn btn-mini fs-14 font-gilroybold onwhite bg-brandccred">Buy Now</Link>
                            </div>

                        </div> */}

                        
                    </div>

                </div>
            </section>

                 
            <section id="details" className="ui-wrapper-large bg-offwhite">
                <div className="container">

                    <div className="col-lg-12 col-md-12">

                        <div className="text-data ui-text-center mrgt" style={{lineHeight: '22px'}}>

                            <h3 className="fs-30 font-helveticabold brandccpurple mrgb2">Some of our Meals</h3>

                            <div className="row">

                                <div className="col-md-4 mrgb1">

                                    <div className="">

                                        <div className="">
                                            <span className=" bg-brandccbluee ui-rounded">
                                                <img src="../../../../images/assets/femoree-kn_ANxnwCQ0-unsplash2 (FILEminimizer).jpg" alt=""  className="ui-rounded-small flist" />
                                            </span>

                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-4 mrgb1">

                                    <div className="">

                                        <div className="">
                                            <span className=" bg-brandccbluee ui-rounded">
                                                <img src="../../../../images/assets/food-1.jpeg" alt="" className="ui-rounded-small flist" />
                                            </span>
                                        </div>

                                    </div>

                                </div>


                                <div className="col-md-4 mrgb1">

                                    <div className="">

                                        <div className="">
                                            <span className=" bg-brandccbluee ui-rounded">
                                                <img src="../../../../images/assets/amala.jpg" alt=""  className="ui-rounded-small flist" />
                                            </span>

                                        </div>
                                    </div>

                                    </div>

                            </div>

                        </div>



                        
                    </div>

                </div>
            </section>



            <section id="details" className="ui-wrapper-large bg-orange" >
                
                <div className="container">
                <div className="">

<div className="row heading-content">

    <div data-aos={"fade-right"} className="col-md-12 mx-auto">
        
        <h1  className=" onwhite font-helvetica font-bold  text-center fs-50">
          Get Started 
        </h1>

                <p className="onwhite fs-14 mrgt1 text-center font-helveticamedium ">
                    Choose from our array Sumptuous Meals</p>
       
        <div className="ui-group-button mrgt2 text-center">
            {/* <Link to="/contact" className="btn btn-big bg-brandccred onwhite oop ui-hide-mobile-only">Check available food</Link> */}
            <Link to="/food-list" className="btn btn-big ghost onwhite order font-helveticamedium">Order Now</Link>
        </div>
        

        {/* <ul class="social_media list-inline onwhite mrgt1">
            <li class="list-inline-item "><a href="" target="_blank" class="ig link-underlined hover"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="" target="_blank" class="fb link-underlined hover"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="" target="_blank" class="lkd link-underlined hover"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
        </ul> */}
        
    </div>

</div>

</div>
                </div>
            </section>

            <Footer />

        </>
    )

}

export default Home;