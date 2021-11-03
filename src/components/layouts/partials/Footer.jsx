import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const scrollTo = (e, t) => {
        e.preventDefault();
        const elem = document.getElementById(t);
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <>
            <footer className="footer ui-full-bg-norm"style={{backgroundImage: 'url("../../images/assets/bg@foot.png")'}}>
                    
                    <div className="ui-wrapper-large">
                        <div className="container">
                            
                            <div className="row">

                                <div className="col-md-3 logo-x">
                                <Link to="/" className="navbar-brand font-helveticabold fs-25 on-black" href="">AYINKEMAY KITCHEN</Link>
                                </div>
                            
                            </div>
                           

                                    <div className="row foo-ter mrgt3">

                                    <div className="col-md-3 col-6 foot-er">
                                            <h4 className="font-helveticabold  fs-18 on-black mrgb"><i className="fa fa-map-pin"></i></h4>
                                            <ul className="font-helveticamedium links">
                                                <li className="link-underlined onmineshaft font-helveticamedium">Lobito Crescent, Wuse 2,
                                                    </li>
                                                <li className="link-underlined onmineshaft font-helveticamedium">Abuja, FCT</li>

                                            </ul>
                                        </div>

                                        <div className="col-md-3 col-6 foot-er">
                                            <h4 className="font-helveticabold   fs-18 on-black mrgb">Shops</h4>
                                            <ul className="font-interregular links">
                                                <li><a href="" className="link-underlined hover font-helveticamedium">Lorem</a></li>
                                                <li><Link to="/careers" className="link-underlined hover font-helveticamedium">Lorem</Link></li>
                                            </ul>
                                        </div>

                                      

                                        <div className="col-md-3 col-6 foot-er">
                                            <h4 className="font-helveticabold  fs-18 on-black mrgb">Pages</h4>
                                            <ul className="font-interregular links">
                                                <li><Link to="/food-list" className="link-underlined hover font-helveticamedium">Meals</Link></li>
                                                <li><Link to="/contact" className="link-underlined hover font-helveticamedium">Contact us</Link></li>
                                                <li><Link to="/feedback" className="link-underlined hover font-helveticamedium">Feedback</Link></li>
                                                
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-6 foot-er">
                                            <h4 className="font-helveticabold    fs-18 on-black font-helveticamedium ">Connect with us online</h4>
                                            <ul className="font-interregular links">
                                                <li><Link className="link-underlined hover "></Link></li>
                                                <li>
                                                <div class="widget about_widget soc">
                                                    <ul class="social_media list-inline">
                                                    <li class="list-inline-item"><a target="_blank" href="" class="bg-instagram"><i class="fab fa-instagram onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="" class="bg-facebook"><i class="fab fa-facebook-f onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="" class="bg-facebook"><i class="fab fa-twitter onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="" class="bg-facebook"><i class="fab fa-linkedin onwhite" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                         </div>


                    </div>

                      
                    
                    <div className="copyright ui-wrapper-mini" style={{backgroundColor: '#F0F5F8'}}>

                        <div className="container">

                            <div className="ui-text-center">

                                <p className="font-gilroylight fs-14 mrgb0 brand-neutral">Copyright &copy; 2021 - AyinkeMay Kitchen. All rights reserved.</p>

                            </div>

                        </div>

                    </div>
            
            </footer>

        </>
    )
}
export default Footer;

